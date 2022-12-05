SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS `clients`;
DROP TABLE IF EXISTS `sales`;
DROP TABLE IF EXISTS `planets`;
DROP TABLE IF EXISTS `information`;
DROP TABLE IF EXISTS `funFacts`;

CREATE TABLE `clients`(
    `clientID` int UNIQUE NOT NULL AUTO_INCREMENT,
    `firstName` varchar(255) NOT NULL,
    `lastName` varchar(255) NOT NULL,
    `phone` varchar(10) UNIQUE NOT NULL,
    `email` varchar(255) NOT NULL,
    PRIMARY KEY(`clientID`)
);



CREATE TABLE `sales`(
    `saleID` int UNIQUE NOT NULL AUTO_INCREMENT,
    `date` DATETIME NOT NULL,
    `price` DECIMAL(19,2),
    `cid` int,
    PRIMARY KEY(saleID),
	FOREIGN KEY(cid) REFERENCES  clients (clientID) ON DELETE SET NULL
);

CREATE TABLE `planets`(
    `planetID` int UNIQUE AUTO_INCREMENT NOT NULL,
    `forSale` BOOLEAN NOT NULL DEFAULT 0,
    `planetName` varchar(255) NOT NULL,
    `sid` int,
	PRIMARY KEY(planetID),
    FOREIGN KEY(sid) REFERENCES sales (saleID) ON DELETE CASCADE
);


CREATE TABLE `information`(
    `infoID` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `distance` INT NOT NULL,
    `size` INT NOT NULL,
    `material` varchar(255) NOT NULL,
    `explored` BOOLEAN NOT NULL DEFAULT 0,
    `lifeDiscovered` BOOLEAN NOT NULL DEFAULT 0,
    `pid` INT,
    `fid` INT,
    PRIMARY KEY(infoID),
    FOREIGN KEY(pid) REFERENCES planets (planetID) ON DELETE CASCADE,
    FOREIGN KEY(fid) REFERENCES funFacts (ffID) ON DELETE CASCADE
);


CREATE TABLE `funFacts`(
    `ffID` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `funFact` varchar(255),
    PRIMARY KEY(ffID)
);

INSERT INTO `clients` (firstName, lastName, phone, email)
VALUES('Motola', 'Anibaba', '2815555555', 'motola@hello.com'),
        ('Javier', 'Garcia', '1234567890', 'javier@hello.com'),
        ('Burna', 'Boy', '9999999999', 'burnaboy@goodbye.com');
        
INSERT INTO `sales`(date, price, cid)
VALUES 
	('12-01-2019', 2322.50, (SELECT clientID FROM clients WHERE firstName = "Motola" AND lastName = "Anibaba")),
    ('06-12-2012', 3400.75, (SELECT clientID FROM clients WHERE firstName = "Javier" AND lastName = "Garcia")),
	('01-01-2020', 1002.30, (SELECT clientID FROM clients WHERE firstName = "Burna" AND lastName = "Boy"))
;

INSERT INTO `planets`(planetName, forSale, sid)
VALUES ('Saturn', TRUE, 1),
    ('Mercury', TRUE, 2),
    ('Venus', TRUE, 3);
    
INSERT INTO `information`(distance, size, material, explored, lifeDiscovered, pid, fid)
VALUES
	(878, 72367, 'Hydrogen and Helium', TRUE, TRUE, 1, 1),
    (117, 3032, 'Mercury is made up mostly of iron.', FALSE, FALSE, 2, 2),
    (160, 7521, 'Central iron core and rocky mantle. Atmosphere is 96 percent CO2 and 3 percent Nitrogen', TRUE, FALSE, 3, 3);

INSERT INTO `funFacts`(funFact)
VALUES
    ('Saturn could float in water because it is mostly made up of gas.'),
    ('Mercury is the smallest planet in the Solar System.'),
    ('Venus is the hottest planet in the Solar System.');

    

SET FOREIGN_KEY_CHECKS=1;
SET AUTOCOMMIT=1;


    
    
