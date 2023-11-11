import firebase_admin
from firebase_admin import credentials, db

## Acceder a la base de datos:
#Recuperar las credenciales del firebase
creds = credentials.Certificate('serviceAccCreds.json')

#Iniciar la app con los permisos de la cuenta
firebase_admin.initialize_app(creds, {
    'databaseURL': 'https://proyecto-iot-2020.firebaseio.com/' #Aqui va el url del firebase que tiene toda la info general
})

# De alguna manera obtener el key del user que esta usando la app para de esta manera mandar ese prop como parametro para los urls 
user = 'userKey'


#Leer los datos
data = db.reference('userKey/campos') #Aqui va el url que da el json de lo que quiero obtener

