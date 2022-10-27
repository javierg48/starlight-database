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
    `phone` INT(10) UNIQUE NOT NULL,
    `email` varchar(255) NOT NULL,
    PRIMARY KEY(`clientID`)
);



CREATE TABLE `sales`(
    `salesID` int UNIQUE AUTO_INCREMENT NOT NULL,
    `date` DATETIME NOT NULL,
    `price` DECIMAL(19,2),
    `cid` int,
    FOREIGN KEY(cid) REFERENCES  clients (clientID),
    PRIMARY KEY(salesID)
);

CREATE TABLE `planets`(
    `planetID` int UNIQUE AUTO_INCREMENT NOT NULL,
    `forSale` BOOLEAN NOT NULL DEFAULT 0,
    `planetName` varchar(255) NOT NULL,
    `sid` int,
    FOREIGN KEY(sid) REFERENCES sales (salesID),
    PRIMARY KEY(planetID)
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
    FOREIGN KEY(pid) REFERENCES planets (planetID),
    FOREIGN KEY(fid) REFERENCES funFacts (ffID)
);


CREATE TABLE `funFacts`(
    `ffID` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `funFact` varchar(255) NOT NULL,
    PRIMARY KEY(ffID)
);

INSERT INTO `clients` (firstName, lastName, phone, email)
VALUES('Motola', 'Anibaba', 2815555555, 'motola@hello.com'),
        ('Javier', 'Garcia', 1234567890, 'javier@hello.com'),
        ('Burna', 'Boy', 9999999999, 'burnaboy@goodbye.com');
        
INSERT INTO `sales`(date, price)
VALUES(

	(SELECT planetID FROM planets WHERE planetName = 'Saturn'),
    '12-01-2019', 2322.50,
    
    (SELECT planetID FROM planets WHERE planetName = 'Mercury'),
    '06-12-2012', 3400.75,

	(SELECT planetID FROM planets WHERE planetName = 'Venus'),
    '01-01-2020', 1002.30
);

INSERT INTO `planets`(planetName, forSale)
VALUES ('Saturn', TRUE),
    ('Mercury', TRUE),
    ('Venus', TRUE);
    
INSERT INTO `information`(distance, size, material, explored, lifeDiscovered)
VALUES(

	(SELECT planetID FROM planets WHERE planetName = 'Saturn'),
	(878, 72367, 'Hydrogen and Helium', TRUE, TRUE),
    
    (SELECT planetID FROM planets WHERE planetName = 'Mercury'),
    (117, 3032, 'Mercury is made up mostly of iron.', FALSE, FALSE),
    
    (SELECT planetID FROM planets WHERE planetName = 'Venus'),
    (160, 7521, 'Central iron core and rocky mantle. Atmosphere is 96 percent CO2 and 3 percent Nitrogen', TRUE, FALSE)
    
);

INSERT INTO `funFacts`(funFact)
VALUES(
	(SELECT planetID FROM planets WHERE planetName = 'Saturn'),
    ('Saturn could float in water because it is mostly made up of gas.'),
    
    (SELECT planetID FROM planets WHERE planetName = 'Mercury'),
    ('Mercury is the smallest planet in the Solar System.'),
    
    (SELECT planetID FROM planets WHERE planetName = 'Venus'),
    ('Venus is the hottest planet in the Solar System.')
    
);
    

SET FOREIGN_KEY_CHECKS=1;
SET AUTOCOMMIT=1;


    
    
