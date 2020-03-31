import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer';

export default function Detail () {
    const navigation = useNavigation();
    const message = 'Olá APAD, estou entrando em contato pois gostaria de ajudar no caso "Cadelinha atropelad" com o valor de R$120,00';
    function navigateBack() {
        navigation.goBack();
    }

    function sendEmail() {
        MailComposer.composeAsync({
            subject: 'abcd',
            recipients: ['nathaliaspinula@gmail.com'],
            body: message
        });
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=5511956532048&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather
                        name="arrow-left"
                        size={28}
                        color="#E82041"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG</Text>
                <Text style={styles.incidentValue}>ADAP</Text>

                <Text style={styles.incidentProperty}>Caso</Text>
                <Text style={styles.incidentValue}>Oie</Text>

                <Text style={styles.incidentProperty}>Valor</Text>
                <Text style={styles.incidentValue}>R$12,00</Text>
            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>
                    Salve o dia!
                </Text>
                <Text style={styles.heroTitle}>
                    Seja o herói desse caso.
                </Text>
                <Text style={styles.heroDescription}>
                    Entre em contato:
                </Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}