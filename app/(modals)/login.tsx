import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


// Enum for Strategy Options To Choose From
enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}
 
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  // Warm up the android browser to improve UX
  useWarmUpBrowser();

  // Inject Router to close the Login Page
  const router = useRouter();

  // Sign In Strategy Options Variable with it auth key eg(googleAuth) serves as the key.
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: "oauth_facebook" });

  
  // Method to select strategy option by its key from above variables,
  // Method signIn/SignUp with the strategy choosen.
  const onSelectAuth = async (strategy: Strategy) => {
    // It select a strategy from these listed here
    const selectedAuth = {
      [Strategy.Apple]: appleAuth,
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
    } [strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      //  If SignIn/SignUp is treu, we create a SessionId and pass it sessionId
      if(createdSessionId) {
        setActive!({ session: createdSessionId });
        // This will close Sign In modal to Explore Page
        router.back();
      }
       
    } catch (err) {
      console.error('OAuth error: ', err);
    }
  }

  return (
    // Lohin UI
    <View style={styles.container}>
      {/* Email TextInput & Button Components */}
      <TextInput 
        autoCapitalize='none'
        placeholder='Email'
        style={[defaultStyles.inputField, { marginBottom:30 }]} 
      />
      {/* Red utton */}
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      {/* Center OR Separator Component */}
      <View style={styles.separatorView}>
        <View style={{ flex:1, borderBottomColor:colors.black, borderBottomWidth: StyleSheet.hairlineWidth, }} />
        <Text style={styles.separator}>or</Text>
        <View style={{ flex:1, borderBottomColor:colors.black, borderBottomWidth: StyleSheet.hairlineWidth, }} />
      </View>
      
      {/* Social Outline Sign In Button Components */}
      <View style={{ gap:20 }}>
        <TouchableOpacity style={styles.outlineBtn}>
          <Ionicons name='call' style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outlineBtn} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name='logo-google' style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outlineBtn} onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name='logo-apple' style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outlineBtn} onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name='logo-facebook' style={defaultStyles.btnIcon} size={24} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.white,
    padding:26,
  },
  separatorView: {
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    marginVertical:30,
  },
  separator: {
    fontFamily: 'outfitSB',
    color: colors.grey
  },
  outlineBtn:{
    backgroundColor:colors.white,
    borderWidth:1,
    borderColor:colors.grey,
    height:50,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    paddingHorizontal:10,
  },
  btnOutlineText: {
    color: colors.black,
    fontSize:16,
    fontFamily: 'outfitSB',
  },
})

export default Login