<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Folder {
  id: number
  name: string
  folder_id: number | null
  created_at: string
  updated_at: string
  sub_folders: Folder[] // Properly defined as an array of Folder objects
  expanded: boolean // Track whether the folder is expanded
}

interface FolderAPIResponse {
  id: number
  name: string
  folder_id: number | null
  created_at: string
  updated_at: string
  sub_folders?: string[] // Make sub_folders optional
}

// State
const folders = ref<Folder[]>([]) // Complete folder structure
const selectedSubfolders = ref<Folder[]>([]) // Direct subfolders of the selected folder
const currentFolderId = ref<number | null>(null) // Track the currently selected folder ID

// Helper function to parse subfolder strings into Folder objects
const parseSubFolderString = (subFolderString: string): Folder | null => {
  // Remove parentheses and split the string by commas
  const cleanedString = subFolderString.replace(/[()]/g, '')
  const parts = cleanedString.split(',')

  // Ensure the string has the correct number of parts
  if (parts.length === 5) {
    return {
      id: parseInt(parts[0]), // Convert id to number
      name: parts[1], // Name
      folder_id: parseInt(parts[2]), // Convert folder_id to number
      created_at: parts[3], // Created at timestamp
      updated_at: parts[4], // Updated at timestamp
      sub_folders: [], // Initialize sub_folders as an empty array
      expanded: false, // Initialize expanded as false
    }
  }
  return null // Return null if the string doesn't match the expected format
}

// Function to fetch folder structure
const fetchFolders = async () => {
  try {
    const response = await axios.get<{ data: FolderAPIResponse[] }>(
      'http://localhost:3000/api/v1/folders',
    )
    folders.value = response.data.data.map((folder) => ({
      ...folder,
      sub_folders: folder.sub_folders
        ? folder.sub_folders
            .map((subFolderString) => parseSubFolderString(subFolderString))
            .filter((subFolder): subFolder is Folder => subFolder !== null) // Filter out null values
        : [], // Fallback to an empty array if sub_folders is undefined
      expanded: false, // Initialize expanded as false
    }))
  } catch (error) {
    console.error('Failed to fetch folders:', error)
  }
}

// Fetch subfolders for a specific folder
const fetchSubFolders = async (folderId: number) => {
  try {
    const response = await axios.get<{ data: FolderAPIResponse }>(
      `http://localhost:3000/api/v1/folders/${folderId}`,
    )
    const folder = response.data.data
    selectedSubfolders.value = folder.sub_folders
      ? folder.sub_folders
          .map((subFolderString) => parseSubFolderString(subFolderString))
          .filter((subFolder): subFolder is Folder => subFolder !== null) // Filter out null values
      : [] // Fallback to an empty array if sub_folders is undefined
    currentFolderId.value = folderId // Update the current folder ID
  } catch (error) {
    console.error('Failed to fetch subfolders:', error)
  }
}

// Fetch the folder structure on component mount
onMounted(fetchFolders)

// Toggle folder expansion and fetch subfolders
const toggleFolder = (folder: Folder) => {
  folder.expanded = !folder.expanded // Toggle the expanded state
  if (folder.expanded) {
    fetchSubFolders(folder.id) // Fetch subfolders if the folder is expanded
  } else {
    selectedSubfolders.value = [] // Clear subfolders if the folder is collapsed
  }
}

// Handle clicking a subfolder in the right panel
const selectSubFolder = (subfolder: Folder) => {
  fetchSubFolders(subfolder.id)
}
</script>

<template>
  <div class="explorer">
    <!-- Left Panel: Folder Structure -->
    <div class="left-panel">
      <ul>
        <li v-for="folder in folders" :key="folder.id" @click="toggleFolder(folder)">
          <i class="fas fa-folder"></i> {{ folder.name }}
          <ul v-if="folder.expanded && folder.sub_folders && folder.sub_folders.length">
            <li
              v-for="subfolder in folder.sub_folders"
              :key="subfolder.id"
              @click.stop="toggleFolder(subfolder)"
            >
              <i class="fas fa-folder"></i> {{ subfolder.name }}
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- Right Panel: Direct Subfolders -->
    <div class="right-panel">
      <ul>
        <li
          v-for="subfolder in selectedSubfolders"
          :key="subfolder.id"
          @click="selectSubFolder(subfolder)"
        >
          <i class="fas fa-folder"></i> {{ subfolder.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.explorer {
  display: flex;
  height: 100vh;
  width: 100%;
}

.left-panel {
  flex: 0 0 20%;
  padding: 10px;
  border-right: 1px solid #ccc;
  overflow-y: auto;
}

.right-panel {
  flex: 0 0 80%;
  padding: 10px;
  overflow-y: auto;
}

ul {
  list-style-type: none;
  padding-left: 20px;
}

li {
  cursor: pointer;
  margin: 5px 0;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
