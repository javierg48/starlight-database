-- Add new client
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

SELECT * FROM client;
INSERT INTO client(firstName, lastName, phone, email)
VALUES (
    :firstNameInput, 
    :lastNameInput, 
    :phoneInput, 
    :emailInput
);

-- Lookup client by phone number
SELECT * FROM client WHERE phone = :phoneInput;

-- Delete client
DELETE FROM client WHERE id = :idInput;

-- Delete client through `sales`
DELETE FROM sales WHERE cid = :idInput;

-- Update client information
UPDATE client SET firstName = :firstNameInput,
                lastName = :lastNameInput,
                phone = :phoneInput,
                email = :emailInput
            WHERE id = :idInput;


-- SALES
-- Query for select a sale functionality
SELECT sales.saleID, clients.firstName, clients.lastName
FROM sales
INNER JOIN clients ON sales.cid = clients.clientID;


-- Add to `sales` table
INSERT INTO sales (date, price, cid) 
VALUES (:dateInput, :priceInput, :cidInput);

-- Delete information from sales
DELETE FROM sales WHERE salesID = :salesIDinput;

-- Update sales information
UPDATE sales SET date = :dateInput,
                price = :priceInput,
                cid = :cidInput
                WHERE salesID = :salesIDinput;

SELECT * FROM planets;

-- Lookup planets by planetName
SELECT * FROM planets WHERE planetName LIKE planetInput;

-- Insert a planet to table
INSERT INTO planets (forSale, planetName) 
VALUES (:fsInput, :pnInput);

-- Delete a planet from sales
DELETE FROM sales WHERE salesID = :salesIDinput;

-- Update planet data
UPDATE planets SET forSale = :fsInput, planetName = :pnInput WHERE planetID =:planetidInput;

-- Select information
SELECT * FROM information;

-- Insert data to information
INSERT INTO information(distance, size, material, explored, lifeDiscovered)
VALUES (distance=:distanceInput, size=:sizeInput, material=:materialInput,
                    explored=:exploredInput, lifeDiscovered = ldInput);


-- Delete data from information
DELETE FROM information WHERE infoID = :infoidInput;

-- Insert data to information
UPDATE information SET distance=:distanceInput, size=:sizeInput, material=:materialInput,
                    explored=:exploredInput, lifeDiscovered = ldInput WHERE infoID = :infoidInput;

-- Select funFacts
SELECT * FROM funFacts;

-- Insert a funFact
INSERT INTO funFacts(funFact) VALUES (:funFactInput);

-- Update a funFact
UPDATE funFacts SET funFact=:funFactInput WHERE ffID = :ffInput;

-- Delete a funFact
DELETE FROM funFacts WHERE ffID = :ffInput;
