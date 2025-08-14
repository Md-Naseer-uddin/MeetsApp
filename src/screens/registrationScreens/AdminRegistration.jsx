import { Text, View,Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'
// import ReadOnlyCharacterData from 'react-native/types_generated/src/private/webapis/dom/nodes/ReadOnlyCharacterData';
function RegisterPage()  {
  const [name, setName] = useState("")
  const [nameVerify, setNameVerify] = useState(false)
  const [email, setEmail ] = useState("")
  const [emailVerify, setEmailVerify] = useState(false)
  const [mobile, setMobile, ] = useState("")
  const [mobileVerify, setMobileVerify] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordVerify, setPasswordVerify] = useState(false)
  const [showpPasswrod, setShowPassword]=useState(false)
  const [location, setLocation] = useState("");
  const [locationVerify, setLocationVerify] = useState(false);
  const [institute, setInstitute] = useState("");
  const [InstituteVerify, setInstituteVerify] = useState(false);


      const navigation = useNavigation();
      const route = useRoute();
      const{role} = route.params|| {};
  
//   const navigation = useNavigation()// navigation to login
  function handleSubmit(){
    const userData={
      name:name,
      email,
      mobile,
      password,
      location,
      institute,
      role
    };


if(nameVerify && emailVerify && passwordVerify && mobileVerify) {
    console.log("Submitting:", userData);
    axios.post("http://192.168.0.100:5001/register", userData)
        .then(response => {
            console.log("Response:", response.data);
            if(response.data.status === "ok") { 
                alert("Registration Successful");
                navigation.navigate("Login")  // navigation to login
            } else {
                alert(JSON.stringify(response.data));
            }
        }) // The closing parenthesis and semicolon for the '.then' block were misplaced
        .catch(error => {
            if (error.response) {
                console.log("Error response:", error.response);
            } else if (error.request) {
                console.log("No response, request object:", error.request);
            } else {
                console.log("Request setup error:", error.message);
            }
        });
} else {
    alert("Fill mandatory details"); // Corrected 'Alert.Alert' to 'Alert.alert'
}




    // axios.post("http://localhost:5001/register", userData)
    // // axios.post("http://192.168.0.100:5001/register", userData)
    // .then(res=>console.log(res.data))
    // .catch(e=> console.log(e.response ?? e.message));



  };

               // Name Validation
  function handleName(e){
    const nameVar = e.nativeEvent.text;
    setName(nameVar)
    setNameVerify(false);

    if(nameVar.length>1){
      setNameVerify(true)
    }
  }
 
  

            // Email Validation
  // function handleEmail(e){
  //   const emailVar = e
  //   setEmail(email)
  //   setEmailVerify(false)
  //   if(/^[\w.%+-]+@[\w,-]+\.[a-zA-Z]{2,}$/.test(emailVar)){
  //     setEmail(emailVar)
  //     setEmailVerify(true);
  //   }
  // }

  function handleEmail(text) {
  setEmail(text);
  setEmailVerify(false);
  const emailRegex = /^[\w.%+-]+@[\w,-]+\.[a-zA-Z]{3,}$/;
  if (emailRegex.test(text)) {
    setEmailVerify(true);
  }
}

         //mobile validation

       const handleMobile = (text) => {
  setMobile(text);
  setMobileVerify(false);

  const mobileRegex = /^\d{10}$/;

  if (mobileRegex.test(text)) {
    setMobileVerify(true);
  }
};

        //password Validation
        const handlePassword = (text) => {
  setPassword(text);
  setPasswordVerify(false);
  const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  if (passwordRegex.test(text)) {
    setPasswordVerify(true);
  }
};


             // Location Validation
  function handleLocation(e){
    const locationVar = e.nativeEvent.text

    setLocation(locationVar)
    setLocationVerify(false);
    
    if(locationVar.length>1){
      setLocationVerify(true)
    }
  }
    
  
  // Institute Validation
  function handleInstitute(e){
    const instituteVar = e.nativeEvent.text;
    setInstitute(instituteVar)
    setInstituteVerify(false);

    if(instituteVar.length>1){
      setInstituteVerify(true)
    }
  }
 



  return (
    <ScrollView 
    contentContainerStyle={{flexGrow:1}}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps={true}
    >

    <View>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('./images/signUp.png')}/>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.text_header}>Register !!!</Text>
        <View style={styles.action}>
            <Icon name="user-o"  color="#835da3ff" style={styles.smallIcon} />
            <TextInput placeholder='Name' placeholderTextColor="#888" style={styles.textInput} onChange={e=>handleName(e)} />
              {name.length < 1 ? null :  nameVerify ? (
                <Feather name="check-circle" color="green" size={20} />
                ):(
                   <Feather name="alert-circle" color="red" size={20}/>
                   )}
        </View>
         {name.length < 1 ? null :  nameVerify ? null :(
         <Text style={{
          marginLeft:20,
          color:'red'
         }}>Name should be more than 1 character</Text>
         )}


        <View style={styles.action}>
            <MaterialCommunityIcons name="email"  color="#835da3ff" style={styles.smallIcon}  />
            <TextInput placeholder=' Email' placeholderTextColor="#888" style={styles.textInput} onChangeText={handleEmail}/>
        
              {email.length < 1 ? null :  emailVerify ? (
                <Feather name="check-circle" color="green" size={20} />
                ):(
                   <Feather name="alert-circle" color="red" size={20}/>
                   )}
        </View>
         {email.length < 1 ? null :  emailVerify ? null :(
         <Text style={{
          marginLeft:20,
          color:'red'
         }}>Enter Proper Email Address</Text>
         )}


      <View style={styles.action}>
            <Icon name="mobile"  color="#835da3ff" style={styles.smallIcon} />
            <TextInput placeholder='Mobile' placeholderTextColor="#888" style={styles.textInput} onChangeText={(e)=>handleMobile(e)} maxLength={10} keyboardType='numeric'/>
               {mobile.length < 1 ? null :  mobileVerify ? (
                <Feather name="check-circle" color="green" size={20} />
                ):(
                   <Feather name="alert-circle" color="red" size={20}/>
                   )}
        </View>
         {mobile.length < 1 ? null :  mobileVerify ? null :(
         <Text style={{
          marginLeft:20,
          color:'red'
         }}>Enter valid mobile number</Text>
         )}


        <View style={styles.action}>
            <Icon name="lock"  color="#420475" style={styles.smallIcon} />
            <TextInput placeholder='Password' placeholderTextColor="#888"  style={styles.textInput} secureTextEntry={!showpPasswrod} onChangeText={handlePassword}/>
            <TouchableOpacity onPress={()=> setShowPassword(!showpPasswrod)}>
              {password.length<1 ? null : !showpPasswrod ? (
                <Feather 
                name="eye-off"
                style={{marginRight:-3}}
               color={passwordVerify? 'green' : 'red'}
               size={23} />
              ):(
                 <Feather 
                name= "eye"
                style={{marginRight:-3}}
               color={passwordVerify ? 'green' : 'red'}
               size={23} 
               />
              )}
            </TouchableOpacity>
        </View>
       {password.length < 1 ? null : !passwordVerify ? (
        <Text style={{ color: 'red', marginLeft: 20 }}>
          Password must be at least 6 characters and include letters
        </Text>
      ) : null}

       <View style={styles.action}>
            <Feather name="navigation"  color="#835da3ff" style={styles.smallIcon} />
            <TextInput placeholder=' Enter Your Location' placeholderTextColor="#888" style={styles.textInput} onChange={e=>handleLocation(e)}/>
        </View>
       
       <View style={styles.action}>
            <Icon name="graduation-cap"  color="#835da3ff" style={styles.smallIcon} />
            <TextInput placeholder='Institution Type (School, College, etc.)' placeholderTextColor="#888" style={styles.textInput} onChange={e=>handleInstitute(e)}/>
        </View>
       

 
        <View style={{
            justifyContent:'flex-end',
            alignItems:'flex-end',
            marginTop:8,
            marginRight:10,
        }}>
            <Text style={{color:'#420475', fontWeight:'70'}}>Forget Password</Text>
        </View>

        
      </View>
      <View style={styles.button}>
            <TouchableOpacity style={styles.inBut} onPress={handleSubmit} >
                <View>
                    <Text style={styles.textSign}>Register</Text>
                </View>
            </TouchableOpacity>
           
        </View>
    </View>
     </ScrollView>
  )
}


export default RegisterPage
