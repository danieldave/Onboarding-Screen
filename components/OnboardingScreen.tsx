import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, FlexAlignType, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '@/utils/asyncStorage';

const { width, height } = Dimensions.get('window');
// A more dynamic style
const lottieStyle = {
    width: Platform.OS === 'web' ? width : width * 0.9,  // Use full width on web, 90% on mobile
    height: Platform.OS === 'web' ? height : width,  // Use full height on web, responsive size on mobile
    alignSelf: 'center' as FlexAlignType, // Center the animation
};
//Define the props type if needed (or use `any` for general use)
type OnboardingScreenProps = StackScreenProps<any>;

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation, route }) => {
    //const navigation = useNavigation();

    const handleDone = () => {
        navigation.navigate('Home');
        setItem('onboarded', '1')
    }

    const doneButton = ({ ...props }) => {
        return (
            <TouchableOpacity style={Styles.doneButton} {...props}>
                <Text>
                    Done
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={Styles.container}>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                bottomBarHighlight={false}
                DoneButtonComponent={doneButton}
                containerStyles={{ paddingHorizontal: 15 }}
                pages={[
                    {
                        backgroundColor: '#1A1F71',
                        image: (
                            <View style={Styles.lottie}>
                                <Text style={Styles.welcomeTextStyle}>Welcome to SMartDev Pro</Text>
                                <LottieView source={require('../assets/animations/a.json')} autoPlay loop style={lottieStyle} />
                            </View>
                        ),
                        title: 'Master the Code, One Challenge at a Time',
                        subtitle: 'Level up your skills by debugging real-world apps and projects',
                    },
                    {
                        backgroundColor: '#2EC4B6',
                        image: (
                            <View style={Styles.lottie}>
                                <Text style={Styles.welcomeTextStyle}>Get Ready to Debug and Learn</Text>
                                <LottieView source={require('../assets/animations/b.json')} autoPlay loop style={{ width: '100%', height: '100%' }} />
                            </View>
                        ),
                        title: 'Turn Bugs into Breakthroughs',
                        subtitle: 'Tackle code challenges designed to boost your problem-solving skills.',
                    },
                    {
                        backgroundColor: '#F89D29',
                        image: (
                            <View style={Styles.lottie}>
                                <Text style={Styles.welcomeTextStyle}>Track, Improve, and Excel</Text>
                                <LottieView source={require('../assets/animations/c.json')} autoPlay loop style={lottieStyle} />
                            </View>
                        ),
                        title: 'Your Growth, Visualized',
                        subtitle: 'Track milestones, unlock achievements, and see how far you have come',
                    },
                    {
                        backgroundColor: '#5A31F4',
                        image: (
                            <View style={Styles.lottie}>
                                <Text style={Styles.welcomeTextStyle}>Ready To Level Up</Text>
                                <LottieView source={require('../assets/animations/w.json')} autoPlay loop style={lottieStyle} />
                            </View>
                        ),
                        title: 'Ready to Build Your Legacy?',
                        subtitle: 'Let us dive into the world of development and innovation',
                    },
                ]}
            />
        </View>
    );
};

export default OnboardingScreen;


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottie: {
        width: width * 0.9,
        height: width
    },
    doneButton: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: width * 0.5,
        borderBottomLeftRadius: width * 0.5
    },
    welcomeTextStyle: {
        fontSize: 32,         // Large and bold for emphasis
        fontWeight: 'bold',   // Makes the text stand out
        color: '#FFFFFF',     // White text color
        textAlign: 'center',  // Center the text horizontally
        marginTop: 20,        // Adds space at the top
        marginBottom: 10,     // Adds space at the bottom
    }
})