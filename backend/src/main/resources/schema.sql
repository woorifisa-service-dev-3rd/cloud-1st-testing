DROP TABLE IF EXISTS schedules;

CREATE TABLE `schedules` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `COMPANY_NAME` varchar(255) NOT NULL,
  `DEADLINE` date NOT NULL,
  `RESULT_DATE` date DEFAULT NULL,
  `RESULT` int NOT NULL,
  PRIMARY KEY (`ID`)
)