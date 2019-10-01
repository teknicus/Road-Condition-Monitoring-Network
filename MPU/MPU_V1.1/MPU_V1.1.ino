#include <Wire.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "WhyFi";                             // WiFi SSID
const char* password = "youshallnotpass";               //WiFi Password
const char* mqtt_server = "192.168.43.83";              //MQTT server IP Address

int potHole_id = 0;                                     //potHole_id is the variable which stores the number or ID of the pothole
String var1, var2, var3, var4, var5; //Temporary variables to store the values of potHole_ID, latitude, longitude, and the delta of change in accelerometer in Z-Axis
int codeLen =27;                                        //length of array which stores the above data which is to be sent
char charac[28];                                        //character array which stores the above data which is to be sent
String post= "";

// MPU6050 Slave Device Address
const uint8_t MPU6050SlaveAddress = 0x68;
// Select SDA and SCL pins for I2C communication 
const uint8_t scl = D6;
const uint8_t sda = D7;

// sensitivity scale factor respective to full scale setting provided in datasheet 
const uint16_t AccelScaleFactor = 16384;
const uint16_t GyroScaleFactor = 131;

String post = "";
// MPU6050 few configuration register addresses
const uint8_t MPU6050_REGISTER_SMPLRT_DIV   =  0x19;          //Ignore all this
const uint8_t MPU6050_REGISTER_USER_CTRL    =  0x6A;
const uint8_t MPU6050_REGISTER_PWR_MGMT_1   =  0x6B;
const uint8_t MPU6050_REGISTER_PWR_MGMT_2   =  0x6C;
const uint8_t MPU6050_REGISTER_CONFIG       =  0x1A;
const uint8_t MPU6050_REGISTER_GYRO_CONFIG  =  0x1B;
const uint8_t MPU6050_REGISTER_ACCEL_CONFIG =  0x1C;
const uint8_t MPU6050_REGISTER_FIFO_EN      =  0x23;
const uint8_t MPU6050_REGISTER_INT_ENABLE   =  0x38;
const uint8_t MPU6050_REGISTER_ACCEL_XOUT_H =  0x3B;
const uint8_t MPU6050_REGISTER_SIGNAL_PATH_RESET  = 0x68;

int16_t AccelX, AccelY, AccelZ, Temperature, GyroX, GyroY, GyroZ; 

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;                                     
char msg[50];                                         //
int value = 0;
//mock latitude data which is being sent
double lat[]={12.7981,12.7999,12.8018,12.8033,12.8045,12.8057,12.8072,12.809,12.8105,12.8124,12.8142,12.8155,12.8172,12.8187,12.8202,12.8215,12.8227,12.8237,12.8255,12.8264,12.8277,12.8295,12.83,12.8304,12.8314,12.8324,12.8344,12.8357,12.8367,12.8382,12.8393,12.8409,12.8421,12.8424,12.8439,12.8443,12.8451,12.8457,12.8463,12.8469,12.8474,12.8479,12.8483};
//mock longitude data which is being sent
double lon[]={80.0221,80.0235,80.0246,80.0258,80.0264,80.0272,80.028,80.029,80.0303,80.0318,80.0328,80.0339,80.0349,80.0359,80.0371,80.038,80.0388,80.0393,80.0404,80.0412,80.0435,80.044,80.0454,80.0464,80.0471,80.0478,80.0503,80.0519,80.0531,80.0545,80.0562,80.0569,80.0575,80.0589,80.0594,80.0603,80.061,80.0616,80.0622,80.0626,80.0631,80.0633,80.0636};

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

//The MQTT message that was recieved is printed
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);         //MQTT topic to be subscribed
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]); //the message which is recieved
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("event", "hello world"); //"event" is the topic, prints hello world when connects to the MQTT connection""
      // ... and resubscribe
      client.subscribe("event");              //"event" is the topic to which we are subscribing
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);                            //sometimes it may not connect to the MQTT server, restart the NodeMCU, i.e remove the MicroUSB then reconnect
    }
  }
}


void setup() {
  Serial.begin(9600);
  Wire.begin(sda, scl);
  pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  //client.setCallback(callback);
  MPU6050_Init();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  double Ax, Ay, Az, T, Gx, Gy, Gz, Az1, d2;        //variables for accelerometer and Gyroscope data
  
  Read_RawValue(MPU6050SlaveAddress, MPU6050_REGISTER_ACCEL_XOUT_H);
  Az1=Az;
  //divide each with their sensitivity scale factor
  Ax = (double)AccelX/AccelScaleFactor;
  Ay = (double)AccelY/AccelScaleFactor;
  Az = (double)AccelZ/AccelScaleFactor;
  T  = (double)Temperature/340+36.53; //temperature formula
  Gx = (double)GyroX/GyroScaleFactor;
  Gy = (double)GyroY/GyroScaleFactor;
  Gz = (double)GyroZ/GyroScaleFactor;

  Serial.print("Ax: "); Serial.print(Ax);
  Serial.print(" Ay: "); Serial.print(Ay);
  Serial.print(" Az: "); Serial.print(Az);
  Serial.print(" T: "); Serial.print(T);
  Serial.print(" Gx: "); Serial.print(Gx);
  Serial.print(" Gy: "); Serial.print(Gy);
  Serial.print(" Gz: "); Serial.println(Gz);

  //d1=Az3-Az2;
  d2=Az1-Az;               //delta of change in accelerometer reading in z-axis

  if(d2>0.4)               //if delta is greater than 0.4, then it is classified as pothole
  {
    Serial.print("Pothole Detected");
    delay(1000);

    var1 = String(potHole_id);        //the temp variables which stores the datas which are merged into one array to be sent
    var2 = String(lat[potHole_id],4);
    var5 = ","; 
    var3 = String(lon[potHole_id],4);
    var4 = String(d2);
  
    post.concat(var1);                //concat the datas into a single array
    post.concat(var5);
    post.concat(var2);
    post.concat(var5);
    post.concat(var3);
    post.concat(var5);
    post.concat(var4);
    post.toCharArray(charac, codeLen + 6);     //the data is sent to charac
    client.publish("message", charac);         //the data stored in charac is sent 
    potHole_id++;                              //goes to the next pot-hole ID
  }

  delay(200);
}

//I2C communication initialisation ignore
void I2C_Write(uint8_t deviceAddress, uint8_t regAddress, uint8_t data){
  Wire.beginTransmission(deviceAddress);
  Wire.write(regAddress);
  Wire.write(data);
  Wire.endTransmission();
}

// read all 14 register
void Read_RawValue(uint8_t deviceAddress, uint8_t regAddress){
  Wire.beginTransmission(deviceAddress);
  Wire.write(regAddress);
  Wire.endTransmission();
  Wire.requestFrom(deviceAddress, (uint8_t)14);
  AccelX = (((int16_t)Wire.read()<<8) | Wire.read());
  AccelY = (((int16_t)Wire.read()<<8) | Wire.read());
  AccelZ = (((int16_t)Wire.read()<<8) | Wire.read());
  Temperature = (((int16_t)Wire.read()<<8) | Wire.read());
  GyroX = (((int16_t)Wire.read()<<8) | Wire.read());
  GyroY = (((int16_t)Wire.read()<<8) | Wire.read());
  GyroZ = (((int16_t)Wire.read()<<8) | Wire.read());
}

//configure MPU6050
void MPU6050_Init(){
  delay(1000);
  
  //Az2=Az1;
  //Az3=Az2;
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_SMPLRT_DIV, 0x07);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_PWR_MGMT_1, 0x01);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_PWR_MGMT_2, 0x00);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_CONFIG, 0x00);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_GYRO_CONFIG, 0x00);//set +/-250 degree/second full scale
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_ACCEL_CONFIG, 0x00);// set +/- 2g full scale
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_FIFO_EN, 0x00);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_INT_ENABLE, 0x01);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_SIGNAL_PATH_RESET, 0x00);
  I2C_Write(MPU6050SlaveAddress, MPU6050_REGISTER_USER_CTRL, 0x00);
}
