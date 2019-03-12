import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native';

export default class Form extends Component {


    constructor(props) {
        super(props);
        this.state = {
            form_name: this.props.name ? this.props.name : '',
            form_email: this.props.email ? this.props.email : '',
            form_contact: this.props.contact ? this.props.contact : '',
            form_website: this.props.website ? this.props.website : '',
            form_dob: this.props.dob ? this.props.dob : '',
            form_name_error: null,
            form_email_error: null,
            form_contact_error: null,
            form_website_error: null,
            form_dob_error: null
        }
    }

    componentDidMount() {
        const fields = ['form_name', 'form_email', 'form_contact', 'form_website', 'form_dob'];
        if (this.props.name || this.props.email || this.props.contact || this.props.website || this.props.dob) {//check if props have been passed
            fields.map(field => {
                this._validateInput(String(field), this.state[field]);
            })
        }
    }

    _handleText = (name, text) => {
        this.setState({
            [name]: text
        })

        this._validateInput(name, text);
    }

    _validateInput = (type, value) => {
        switch (type) {
            case 'form_name':

                if (String(value).trim().length <= 2) this.setState({ [type + '_error']: true })
                else this.setState({ [type + '_error']: false })
                break;

            case 'form_email':

                let emailRegex = RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
                if (!emailRegex.test(String(value))) this.setState({ [type + '_error']: true })
                else this.setState({ [type + '_error']: false })
                break;

            case 'form_contact':

                let phoneRegex = RegExp('^[0-9]{10}$'); //10 digit number
                if (!phoneRegex.test(String(value))) this.setState({ [type + '_error']: true })
                else this.setState({ [type + '_error']: false })
                break;

            case 'form_website':

                let urlRegex = RegExp('^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$');
                if (!urlRegex.test(String(value))) this.setState({ [type + '_error']: true })
                else this.setState({ [type + '_error']: false })
                break;

            case 'form_dob':

                let dobRegex = RegExp('^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$'); //dd/mm/yyyy format
                if (!dobRegex.test(String(value))) this.setState({ [type + '_error']: true })
                else this.setState({ [type + '_error']: false })
                break;
        }
    }

    _showInfo(type) {
        let msg = '';

        switch (type) {
            case 'form_name':
                msg = 'Enter your Name';
                break;
            case 'form_email':
                msg = 'name@example.com'
                break;
            case 'form_contact':
                msg = '10 digit mobile #'
                break;
            case 'form_website':
                msg = 'www.example.com'
                break;
            case 'form_dob':
                msg = 'dd/mm/yyyy'
                break;
        }

        ToastAndroid.show(msg, ToastAndroid.LONG);
    }

    render() {
        return (
            <View>
                <View style={styles.formContainer}>

                    {/* NAME */}
                    <View style={styles.formInputContainer}>
                        <View style={styles.formLabelContainer}>
                            <Text style={styles.formInputLabel}>Name</Text>
                        </View>
                        <TextInput value={this.state.form_name} placeholder={'Your Name'} onChangeText={(text) => this._handleText('form_name', text)} style={[styles.formTextInput, {}]} />
                        <TouchableOpacity style={{ position: 'absolute', right: 0, marginRight: 10 }} onPress={() => this._showInfo('form_name')}>
                            <Image source={!this.state.form_name_error ? require('../assets/images/information-icon.png') : require('../assets/images/information-icon-error.png')} style={{ height: 25, width: 25, }} />
                        </TouchableOpacity>
                    </View>

                    {/* EMAIL */}
                    <View style={styles.formInputContainer}>
                        <View style={styles.formLabelContainer}>
                            <Text style={styles.formInputLabel}>Email</Text>
                        </View>
                        <TextInput keyboardType={'email-address'} value={this.state.form_email} onChangeText={(text) => this._handleText('form_email', text)} placeholder={'yourname@example.com'} style={[styles.formTextInput, {}]} />
                        <TouchableOpacity style={{ position: 'absolute', right: 0, marginRight: 10 }} onPress={() => this._showInfo('form_email')}>
                            <Image source={!this.state.form_email_error ? require('../assets/images/information-icon.png') : require('../assets/images/information-icon-error.png')} style={{ height: 25, width: 25, }} />
                        </TouchableOpacity>
                    </View>

                    {/* CONTACT NUMBER */}
                    <View style={styles.formInputContainer}>
                        <View style={styles.formLabelContainer}>
                            <Text style={styles.formInputLabel}>Contact</Text>
                        </View>
                        <TextInput keyboardType={'phone-pad'} value={this.state.form_contact} onChangeText={(text) => this._handleText('form_contact', text)} placeholder={'10 Digit Mobile Number'} style={[styles.formTextInput, {}]} />
                        <TouchableOpacity style={{ position: 'absolute', right: 0, marginRight: 10 }} onPress={() => this._showInfo('form_contact')}>
                            <Image source={!this.state.form_contact_error ? require('../assets/images/information-icon.png') : require('../assets/images/information-icon-error.png')} style={{ height: 25, width: 25, }} />
                        </TouchableOpacity>
                    </View>

                    {/* WEBSITE */}
                    <View style={styles.formInputContainer}>
                        <View style={styles.formLabelContainer}>
                            <Text style={styles.formInputLabel}>Website</Text>
                        </View>
                        <TextInput value={this.state.form_website} onChangeText={(text) => this._handleText('form_website', text)} placeholder={'http://www.example.com'} style={[styles.formTextInput, {}]} />
                        <TouchableOpacity style={{ position: 'absolute', right: 0, marginRight: 10 }} onPress={() => this._showInfo('form_website')}>
                            <Image source={!this.state.form_website_error ? require('../assets/images/information-icon.png') : require('../assets/images/information-icon-error.png')} style={{ height: 25, width: 25, }} />
                        </TouchableOpacity>
                    </View>

                    {/* DATE OF BIRTH */}
                    <View style={styles.formInputContainer}>
                        <View style={styles.formLabelContainer}>
                            <Text style={styles.formInputLabel}>Date of Birth</Text>
                        </View>
                        <TextInput value={this.state.form_dob} keyboardType={'phone-pad'} onChangeText={(text) => this._handleText('form_dob', text)} placeholder={'dd/mm/yyyy'} style={[styles.formTextInput, {}]} />
                        <TouchableOpacity style={{ position: 'absolute', right: 0, marginRight: 10 }} onPress={() => this._showInfo('form_dob')}>
                            <Image source={!this.state.form_dob_error ? require('../assets/images/information-icon.png') : require('../assets/images/information-icon-error.png')} style={{ height: 25, width: 25, }} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
        borderWidth: 1,
        margin: 5
    },

    formInputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#c6c6c6',
        borderBottomWidth: 1,
        width: '100%',
        padding: 5
    },

    formLabelContainer: {
        width: '25%'
    },

    formInputLabel: {
        fontSize: 18,
        color: '#333333'
    },

    formTextInput: {
        color: '#525252',
        fontSize: 17,
        flex: 1,
        marginLeft: 15,
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5,

    }
})