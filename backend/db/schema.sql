-- Create folders table
CREATE TABLE IF NOT EXISTS folders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    folder_id INTEGER REFERENCES folders(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert Root Folders
INSERT INTO folders (name, folder_id) VALUES 
('Documents', NULL),
('Pictures', NULL),
('Videos', NULL),
('Downloads', NULL);

-- Get Root Folder IDs
WITH root_folders AS (
    SELECT id, name FROM folders WHERE folder_id IS NULL
)
-- Insert Subfolders (Level 1)
INSERT INTO folders (name, folder_id) VALUES
('Projects', (SELECT id FROM root_folders WHERE name = 'Documents')),
('Reports', (SELECT id FROM root_folders WHERE name = 'Documents')),
('Notes', (SELECT id FROM root_folders WHERE name = 'Documents')),

('Vacation', (SELECT id FROM root_folders WHERE name = 'Pictures')),
('Family', (SELECT id FROM root_folders WHERE name = 'Pictures')),
('Screenshots', (SELECT id FROM root_folders WHERE name = 'Pictures')),

('Movies', (SELECT id FROM root_folders WHERE name = 'Videos')),
('Tutorials', (SELECT id FROM root_folders WHERE name = 'Videos')),

('Software', (SELECT id FROM root_folders WHERE name = 'Downloads')),
('PDFs', (SELECT id FROM root_folders WHERE name = 'Downloads')),
('Compressed', (SELECT id FROM root_folders WHERE name = 'Downloads'));

-- Get Level 1 Subfolder IDs
WITH subfolders AS (
    SELECT id, name FROM folders WHERE folder_id IS NOT NULL
)
-- Insert Level 2 Subfolders
INSERT INTO folders (name, folder_id) VALUES
('Frontend', (SELECT id FROM subfolders WHERE name = 'Projects')),
('Backend', (SELECT id FROM subfolders WHERE name = 'Projects')),
('Database', (SELECT id FROM subfolders WHERE name = 'Projects')),

('Annual', (SELECT id FROM subfolders WHERE name = 'Reports')),
('Monthly', (SELECT id FROM subfolders WHERE name = 'Reports')),

('Personal', (SELECT id FROM subfolders WHERE name = 'Notes')),
('Work', (SELECT id FROM subfolders WHERE name = 'Notes')),

('2023 Trip', (SELECT id FROM subfolders WHERE name = 'Vacation')),
('Beach', (SELECT id FROM subfolders WHERE name = 'Vacation')),

('Parents', (SELECT id FROM subfolders WHERE name = 'Family')),
('Siblings', (SELECT id FROM subfolders WHERE name = 'Family')),

('Screenshots 2023', (SELECT id FROM subfolders WHERE name = 'Screenshots')),
('Screenshots 2024', (SELECT id FROM subfolders WHERE name = 'Screenshots')),

('Action', (SELECT id FROM subfolders WHERE name = 'Movies')),
('Sci-Fi', (SELECT id FROM subfolders WHERE name = 'Movies')),

('Web Development', (SELECT id FROM subfolders WHERE name = 'Tutorials')),
('Machine Learning', (SELECT id FROM subfolders WHERE name = 'Tutorials')),

('Installers', (SELECT id FROM subfolders WHERE name = 'Software')),
('Drivers', (SELECT id FROM subfolders WHERE name = 'Software')),

('Books', (SELECT id FROM subfolders WHERE name = 'PDFs')),
('Manuals', (SELECT id FROM subfolders WHERE name = 'PDFs')),

('ZIP Files', (SELECT id FROM subfolders WHERE name = 'Compressed')),
('RAR Files', (SELECT id FROM subfolders WHERE name = 'Compressed'));

-- Get Level 2 Subfolder IDs
WITH subfolders_level2 AS (
    SELECT id, name FROM folders WHERE folder_id IS NOT NULL AND name IN (
        'Frontend', 'Backend', 'Database', 'Annual', 'Monthly', 'Personal', 'Work', 
        '2023 Trip', 'Beach', 'Parents', 'Siblings', 'Screenshots 2023', 'Screenshots 2024',
        'Action', 'Sci-Fi', 'Web Development', 'Machine Learning', 'Installers', 
        'Drivers', 'Books', 'Manuals', 'ZIP Files', 'RAR Files'
    )
)
-- Insert Level 3 Subfolders
INSERT INTO folders (name, folder_id) VALUES
('React', (SELECT id FROM subfolders_level2 WHERE name = 'Frontend')),
('Vue', (SELECT id FROM subfolders_level2 WHERE name = 'Frontend')),
('Angular', (SELECT id FROM subfolders_level2 WHERE name = 'Frontend')),

('Node.js', (SELECT id FROM subfolders_level2 WHERE name = 'Backend')),
('Laravel', (SELECT id FROM subfolders_level2 WHERE name = 'Backend')),

('PostgreSQL', (SELECT id FROM subfolders_level2 WHERE name = 'Database')),
('MongoDB', (SELECT id FROM subfolders_level2 WHERE name = 'Database')),

('Q1 Reports', (SELECT id FROM subfolders_level2 WHERE name = 'Annual')),
('Q2 Reports', (SELECT id FROM subfolders_level2 WHERE name = 'Annual')),

('January', (SELECT id FROM subfolders_level2 WHERE name = 'Monthly')),
('February', (SELECT id FROM subfolders_level2 WHERE name = 'Monthly')),

('Work Notes', (SELECT id FROM subfolders_level2 WHERE name = 'Personal')),
('Daily Journal', (SELECT id FROM subfolders_level2 WHERE name = 'Personal')),

('Budgeting', (SELECT id FROM subfolders_level2 WHERE name = 'Work')),
('Meeting Minutes', (SELECT id FROM subfolders_level2 WHERE name = 'Work')),

('Beach Photos', (SELECT id FROM subfolders_level2 WHERE name = '2023 Trip')),
('Hotel Stays', (SELECT id FROM subfolders_level2 WHERE name = '2023 Trip')),

('Marvel Movies', (SELECT id FROM subfolders_level2 WHERE name = 'Action')),
('DC Movies', (SELECT id FROM subfolders_level2 WHERE name = 'Action')),

('AI Tutorials', (SELECT id FROM subfolders_level2 WHERE name = 'Machine Learning')),
('Deep Learning', (SELECT id FROM subfolders_level2 WHERE name = 'Machine Learning')),

('Windows Drivers', (SELECT id FROM subfolders_level2 WHERE name = 'Drivers')),
('Mac Drivers', (SELECT id FROM subfolders_level2 WHERE name = 'Drivers')),

('E-books', (SELECT id FROM subfolders_level2 WHERE name = 'Books')),
('Research Papers', (SELECT id FROM subfolders_level2 WHERE name = 'Books')),

('Software Archives', (SELECT id FROM subfolders_level2 WHERE name = 'ZIP Files')),
('Backup Files', (SELECT id FROM subfolders_level2 WHERE name = 'RAR Files'));
