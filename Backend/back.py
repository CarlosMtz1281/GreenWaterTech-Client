import firebase_admin
from firebase_admin import credentials, db

## Acceder a la base de datos:
#Recuperar las credenciales del firebase
creds = credentials.Certificate('serviceAccCreds.json')

#link de la base de datos
url = 'https://proyecto-iot-2020.firebaseio.com/'

#Iniciar la app con los permisos de la cuenta
firebase_admin.initialize_app(creds, {
    'databaseURL': 'url' #Aqui va el url del firebase que tiene toda la info general
})

# De alguna manera obtener el key del user que esta usando la app para de esta manera mandar ese prop como parametro para los urls 
user = 'userKey'


#Leer los datos
data = db.reference(f'{url}/{user}/campos') #Aqui va el url que da el json de lo que quiero obtener







def get_campos(user):
    data = db.reference(f'{url}/{user}/campos')
    return data

def get_cuadrantes(user):
    data = db.reference(f'{url}/{user}/cuadrantes')
    return data   