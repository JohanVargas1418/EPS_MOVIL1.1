import AsociadoStack from "./stacks/AsociadoStack";
import ActividadStack from "./stacks/ActividadStack";
import PagoStack from "./stacks/PagoStack";
import ParticipanteStack from "./stacks/ParticipanteStack";
import PrestamoStack from "./stacks/PrestamoStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#f4340c", // color cuando está activo
            tabBarActiveTintColor: "#f4340c", // color cuando esta inactivo
            tabBarActiveTintColor: {backgroundColor: "#f4340c"}, // Fondo de la barra
          }}
        >
            <Tab.Screen name="Asociados" component={CitasStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),
            }}/>

            <Tab.Screen name="Actividades" component={EspecialidadesStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <Feather name="activity" size={24} color="red" />
                )
            }}/>

            <Tab.Screen name="Pagos" component={MedicosStack} options={{
                tabBarIcon: ({ color, size }) =>
                    <Entypo name="paypal" size={24} color="lightblue" />

            }}/>

            <Tab.Screen name="Participantes" component={PacienteStack} options={{
                tabBarIcon: ({ color, size }) =>
                    <FontAwesome6 name="people-group" size={24} color="silver" />

            }}/>
        </Tab.Navigator>
    );
}
