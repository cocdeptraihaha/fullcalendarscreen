-- MySQL Database Schema for Medical Appointment System
-- Converted from JSON data

-- Create database (uncomment if needed)
-- CREATE DATABASE medical_appointments;
-- USE medical_appointments;

-- Drop tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS appointment_services;
DROP TABLE IF EXISTS staff_services;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS appointment_types;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS settings;

-- Create appointment_types table
CREATE TABLE appointment_types (
    id VARCHAR(10) PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    color VARCHAR(7),
    deleted_at TIMESTAMP NULL
);

-- Create contacts table
CREATE TABLE contacts (
    id VARCHAR(10) PRIMARY KEY,
    avatar TEXT,
    name VARCHAR(100) NOT NULL
);

-- Create services table
CREATE TABLE services (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);

-- Create staff table
CREATE TABLE staff (
    id VARCHAR(10) PRIMARY KEY,
    avatar TEXT,
    name VARCHAR(100) NOT NULL
);

-- Create appointments table
CREATE TABLE appointments (
    id VARCHAR(10) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    type_id VARCHAR(10),
    contact_id VARCHAR(10),
    staff_id VARCHAR(10),
    start_time BIGINT NOT NULL,
    end_time BIGINT NOT NULL,
    FOREIGN KEY (type_id) REFERENCES appointment_types(id),
    FOREIGN KEY (contact_id) REFERENCES contacts(id),
    FOREIGN KEY (staff_id) REFERENCES staff(id)
);

-- Create many-to-many relationship table for appointments and services
CREATE TABLE appointment_services (
    appointment_id VARCHAR(10),
    service_id VARCHAR(10),
    PRIMARY KEY (appointment_id, service_id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Create many-to-many relationship table for staff and services
CREATE TABLE staff_services (
    staff_id VARCHAR(10),
    service_id VARCHAR(10),
    PRIMARY KEY (staff_id, service_id),
    FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Create settings table
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(50) NOT NULL,
    setting_value TEXT,
    UNIQUE KEY unique_setting_key (setting_key)
);

-- Insert appointment_types data
INSERT INTO appointment_types (id, label, color, deleted_at) VALUES
('1', 'Consultation', '#2ecc71', NULL),
('2', 'Follow-up', '#b09973', NULL),
('3', 'Procedure', '#ff1a66', NULL),
('4', 'NEW Weight Loss Consultation', '#1abc9c', NULL),
('5', 'Follow-Up Weight Loss Consultation', '#173436', NULL),
('6', 'Date', '#fec3f3', '2025-08-28 09:33:14');

-- Insert contacts data
INSERT INTO contacts (id, avatar, name) VALUES
('1', 'https://www.w3schools.com/w3images/avatar2.png', 'Julie at PilotPractice'),
('2', 'https://www.w3schools.com/w3images/avatar2.png', 'Yari Maldonado'),
('3', 'https://www.w3schools.com/w3images/avatar2.png', 'IL Rockford'),
('4', 'https://www.w3schools.com/w3images/avatar2.png', 'Unknown'),
('5', 'https://www.w3schools.com/w3images/avatar2.png', 'Reza Keshavarzi'),
('6', 'https://www.w3schools.com/w3images/avatar2.png', 'Unknown');

-- Insert services data
INSERT INTO services (id, name) VALUES
('1', 'Expedited Gastric Sleeve'),
('2', 'Teen Gastric Sleeve'),
('3', 'Gastric Balloon'),
('4', 'Endoscopic Sleeve Gastroplasty (ESG)'),
('5', 'Gastric Bypass Revision'),
('6', 'Weight Loss Injections'),
('7', 'Low BMI Gastric Sleeve'),
('8', 'I am Not Sure');

-- Insert staff data
INSERT INTO staff (id, avatar, name) VALUES
('1', 'https://www.w3schools.com/w3images/avatar2.png', 'Pilotpractice Support'),
('2', 'https://www.w3schools.com/w3images/avatar2.png', 'Dr. Reza Keshavarzi'),
('3', 'https://www.w3schools.com/w3images/avatar2.png', 'Lucia Teran'),
('4', 'https://www.w3schools.com/w3images/avatar2.png', 'Rose Huber'),
('5', 'https://www.w3schools.com/w3images/avatar2.png', 'Lily Colas'),
('6', 'https://www.w3schools.com/w3images/avatar2.png', 'Dr. Pat Pazmiño'),
('7', 'https://www.w3schools.com/w3images/avatar2.png', 'Dr. Sarah Johnson'),
('8', 'https://www.w3schools.com/w3images/avatar2.png', 'Dr. Michael Chen'),
('9', 'https://www.w3schools.com/w3images/avatar2.png', 'Dr. Lisa Anderson');

-- Insert appointments data
INSERT INTO appointments (id, title, type_id, contact_id, staff_id, start_time, end_time) VALUES
('7', 'Follow-up Appointment', '2', '1', '8', 1756641600000, 1756643400000),
('10', 'Follow-up Appointment', '2', '5', '7', 1756123800000, 1756125600000),
('13', 'Follow-up Appointment', '2', '1', '2', 1756296600000, 1756298400000),
('14', 'Follow-up Appointment', '2', '2', '3', 1756728900000, 1756730700000),
('20', 'Procedure Appointment', '3', '2', '7', 1755178500000, 1755180300000),
('23', 'Follow-up Appointment', '2', '1', '2', 1756278600000, 1756280400000),
('25', 'NEW Weight Loss Consultation Appointment', '4', '3', '2', 1756183800000, 1756185600000),
('26', 'Procedure Appointment', '3', '2', '3', 1755752400000, 1755754200000),
('27', 'Follow-up Appointment', '2', '2', '3', 1755147900000, 1755149700000),
('28', 'Follow-up Appointment', '2', '2', '3', 1755234300000, 1755236100000),
('29', 'Follow-up Appointment', '2', '2', '2', 1755324300000, 1755326100000),
('30', 'Follow-up Appointment', '2', '2', '2', 1756188900000, 1756190700000),
('33', 'Follow-up Appointment', '2', '2', '8', 1756457400000, 1756459200000),
('34', 'hihi', '2', '2', '8', 1756344900000, 1756346700000),
('36', 'Date Appointment', '43fd', '1', '2', 1754099100000, 1754100900000),
('37', 'Procedure Appointment', '3', '1', '2', 1755066000000, 1755067800000),
('38', 'Procedure Appointment', '3', '2', '4', 1754020800000, 1754022600000),
('39', 'Consultation Appointment', '1', '4', '1', 1753935000000, 1753936800000),
('40', 'Follow-up Appointment', '2', '2', '5', 1756440300000, 1756442100000);

-- Insert appointment_services relationships
INSERT INTO appointment_services (appointment_id, service_id) VALUES
('7', '7'),
('10', '2'), ('10', '5'),
('13', '1'), ('13', '2'),
('14', '1'), ('14', '2'), ('14', '3'),
('20', '1'), ('20', '2'), ('20', '5'),
('23', '1'), ('23', '2'), ('23', '6'),
('25', '1'), ('25', '2'), ('25', '3'),
('26', '1'), ('26', '2'),
('27', '3'), ('27', '2'),
('28', '1'), ('28', '2'),
('29', '2'), ('29', '1'),
('30', '1'), ('30', '3'),
('33', '5'),
('34', '1'), ('34', '2'), ('34', '5'),
('36', '2'),
('37', '1'), ('37', '2'),
('38', '1'),
('39', '8'),
('40', '2');

-- Insert staff_services relationships
INSERT INTO staff_services (staff_id, service_id) VALUES
('1', '8'),
('2', '1'), ('2', '2'), ('2', '3'), ('2', '8'),
('3', '1'), ('3', '2'), ('3', '3'), ('3', '6'),
('4', '1'), ('4', '6'),
('5', '2'), ('5', '3'),
('6', '4'), ('6', '5'), ('6', '1'),
('7', '2'), ('7', '5'), ('7', '7'), ('7', '1'),
('8', '7'), ('8', '5'),
('9', '6'), ('9', '4');

-- Insert settings data
INSERT INTO settings (setting_key, setting_value) VALUES
('visibleContacts', '["1", "2", "3", "4", "5", "6"]');

-- Create indexes for better performance
CREATE INDEX idx_appointments_start_time ON appointments(start_time);
CREATE INDEX idx_appointments_end_time ON appointments(end_time);
CREATE INDEX idx_appointments_type_id ON appointments(type_id);
CREATE INDEX idx_appointments_contact_id ON appointments(contact_id);
CREATE INDEX idx_appointments_staff_id ON appointments(staff_id);
CREATE INDEX idx_appointment_types_deleted_at ON appointment_types(deleted_at);

-- Show table information
SHOW TABLES;

-- Display record counts
SELECT 'appointment_types' as table_name, COUNT(*) as record_count FROM appointment_types
UNION ALL
SELECT 'contacts', COUNT(*) FROM contacts
UNION ALL
SELECT 'services', COUNT(*) FROM services
UNION ALL
SELECT 'staff', COUNT(*) FROM staff
UNION ALL
SELECT 'appointments', COUNT(*) FROM appointments
UNION ALL
SELECT 'appointment_services', COUNT(*) FROM appointment_services
UNION ALL
SELECT 'staff_services', COUNT(*) FROM staff_services
UNION ALL
SELECT 'settings', COUNT(*) FROM settings;
