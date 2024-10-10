DROP TABLE IF EXISTS schedules;

CREATE TABLE `schedules` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `COMPANY_NAME` varchar(255) NOT NULL,
  `DEADLINE` date NOT NULL,
  `RESULT_DATE` date DEFAULT NULL,
  `RESULT` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci