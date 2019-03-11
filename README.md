# Road Condition Monitoring Network

Monitoring and maintenance of roads are still a pain-point for Governments and the Public Works Department. RCMN is an end-to-end integrated solution for monitoring the condition of roads and bring critical failures to the notice of the responsible personnel. The system automatically passes the raised ticket to higher authorities to ensure that the condition is maintained.

#System Structure:

- Sensor Nodes : The system uses sensor nodes fitted to Public transport and Government vehicles. These sensor nodes comprise of : 
    - An Inertial Measurement Unit (IMU)
    - A GSM Module
    - A GPS Module
    
- The collected data by each node is relayed to the base-station over GSM.
- The Base-Station analyses the telemetry data received from nodes all across the city to detect frequent triggers. This avoids errors and false positives.
- Once a high frequency spot has been located, it is stored in the database and a notification is sent to the drivers of vehicles to confirm the existence of these potholes.
- These spots are tagged on a map for the public to view and audit.
- Once the confirmation is received, A ticket is raised to The Public-Works Department of the City to resolve the issue.
- The system flags the location for a set time period to wait for the issue to be resolved. If the issue is not resolved, The ticket is raised to higher authorities.
    
#Advantages of RCMN
- A fully automated system
- Low cost of Implementation
- End-to-End Integration
- Builds on Existing Infrastructure
- Public Transparency and Influence in City Infrastructure.
