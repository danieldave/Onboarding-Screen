import { View, Text, StyleSheet, Dimensions, Platform, FlexAlignType, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { removeItem } from "@/utils/asyncStorage";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from "@/app/_layout"; // Make sure the type is imported correctly

const { width, height } = Dimensions.get('window');
// A more dynamic style
const lottieStyle = {
    width: Platform.OS === 'web' ? width : width * 0.9,  // Use full width on web, 90% on mobile
    height: Platform.OS === 'web' ? height : width,  // Use full height on web, responsive size on mobile
    alignSelf: 'center' as FlexAlignType, // Center the animation
};

type OnboardingScreenNavigationProp = StackNavigationProp<RootParamList, 'Onboarding'>;

type Props = {
    navigation: OnboardingScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    //const navigation = useNavigation();

    const handleReset = async () => {
        await removeItem('onboarded');
        navigation.navigate('Onboarding');
    }
    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.lottie}>
                <LottieView source={require('../assets/animations/f.json')} autoPlay loop style={lottieStyle} />
            </View>
            <Text style={Styles.text}>
                Home Page
            </Text>
            <TouchableOpacity onPress={handleReset} style={Styles.resetButton}>
                <Text>
                    Reset
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default HomeScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    lottie: {
        width: width * 0.9,
        height: width
    },
    text: {
        fontSize: width * 0.09,
        marginBottom: 20,
    },
    resetButton: {
        backgroundColor: '#34d399',
        padding: 10,
        borderRadius: 10
    }
})