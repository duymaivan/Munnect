import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashMunnectScreen from './SplashMunnectScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from '../Login/LoginScreen';
import RegistScreen from '../Login/RegisterScreen';
import ForgetPassScreen from '../Login/ForgetPassScreen';
import NewPost from '../Posts/NewPost';
import UpdatePost from '../Posts/UpdatePost';
import DetailPost from "../Posts/DetailPost";
import ViewAccount from "../Account/ViewAccount";
import PreviewAccount from '../Account/PreviewAccount';
import ListAccount from "../Account/ListAccount";
import SearchScreen from "../Setting/SearchScreen";
import UpdateAccountScreen from "../Setting/UpdateAccountScreen";
import UpdateItemScreen from "../Setting/UpdateItemScreen";
import ChangePassScreen from "../Setting/ChangePassScreen";
import ListMyPost from '../Setting/ListMyPostScreen';

const StackNav = createNativeStackNavigator();

const AppNavi = () => {

  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName='SplashScreen'>
        <StackNav.Screen name='SplashMunnectScreen' component={SplashMunnectScreen} options={{ headerShown: false }} />
        <StackNav.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <StackNav.Screen name='RegistScreen' component={RegistScreen} options={{ headerShown: false }} />
        <StackNav.Screen name='ForgetPassScreen' component={ForgetPassScreen} options={{ headerShown: false }} />
        <StackNav.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
        <StackNav.Screen name='NewPost' component={NewPost}
          options={{
            title: 'Bài viết mới',
            headerStyle: {},
            headerTitleStyle: {
              fontWeight: '400',
              fontSize: 25
            },
          }} />
        <StackNav.Screen name='UpdatePost' component={UpdatePost}
          options={{
            title: 'Sửa bài viết',
            headerStyle: {},
            headerTitleStyle: {
              fontWeight: '400',
              fontSize: 25
            },
          }} />
        <StackNav.Screen name='ViewAccount' component={ViewAccount}
          options={{ headerShown: false }} />
        <StackNav.Screen name='PreviewAccount' component={PreviewAccount}
          options={({ route }) =>
          ({
            title: route.params.title,
            headerStyle: {},
            headerTitleStyle: {
              fontWeight: '400',
              fontSize: 25
            },
            headerRight: () => (
              <TouchableOpacity >
                <Text style={{ fontSize: 21, color: '#148A4F' }}>Lưu</Text>
              </TouchableOpacity>
            ),
          })} />
        <StackNav.Screen name='ListAccount' component={ListAccount}
          options={({ route }) =>
          ({
            title: route.params.title,
            headerStyle: {},
            headerTitleStyle: {
              fontWeight: '400',
              fontSize: 25
            },
          })} />
        <StackNav.Screen name='SearchScreen' component={SearchScreen}
          options={{ headerShown: false }} />
        <StackNav.Screen name="UpdateAccountScreen" component={UpdateAccountScreen}
          options={{
            title: 'Cập nhật thông tin',
            headerTitleStyle: {
              fontSize: 26
            }
          }} />
        <StackNav.Screen name='UpdateItemScreen' component={UpdateItemScreen}
          options={({ route }) =>
          ({

            title: 'Cập nhật ' + route.params.title,
            headerTitleStyle: {
              fontSize: 26
            }
          })
          } />
        <StackNav.Screen name='DetailPost' component={DetailPost}
          options={({ route }) =>
          ({
            title: "Bài viết của " + route.params.title,
            headerStyle: {},
            headerTitleStyle: {
              fontWeight: '400',
              fontSize: 25
            },
          })} />
        <StackNav.Screen name='ChangePassScreen' component={ChangePassScreen}
          options={({ route }) =>
          ({
            title: 'Thay đổi mật khẩu',
            headerStyle: {},
            headerTitleStyle: {
              fontWeight: '400',
              fontSize: 25
            },
          })} />
        <StackNav.Screen name='ListMyPost' component={ListMyPost}
          options={({ route }) =>
          ({
            title: 'Danh sách bài viết',
            headerStyle: {},
            headerTitleStyle: {
              fontWeight: '400',
              fontSize: 25
            },
          })} />
      </StackNav.Navigator>
    </NavigationContainer>
  )
}
export default AppNavi;
