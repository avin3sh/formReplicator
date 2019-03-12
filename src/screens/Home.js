import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import Form from '../components/Form';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            forms: []
        }

        this.MainForm = React.createRef();
    }

    _generateNewForm = () => {
        const forms = this.state.forms;
        forms.push(this.MainForm.current.state);
        this.setState({
            forms: forms
        })
    }

    _getAllForms = () => {
        console.log(this.state.forms);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.header}>
                    <Text style={{ color: '#333333', fontSize: 20 }}>Test</Text>
                    <TouchableOpacity onPress={this._generateNewForm}><Text style={styles.headerButton}>+</Text></TouchableOpacity>
                </View>

                <View>
                    <Form ref={this.MainForm} />
                </View>

                <View>
                    {this.state.forms.map((form, index) => {
                        return (
                            <View style={{ margin: 5 }}>
                                <Text>Form {index + 1}</Text>
                                <Form name={form.form_name} email={form.form_email} contact={form.form_contact} website={form.form_website} dob={form.form_dob} key={index} />
                            </View>

                        )
                    })}
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={this._getAllForms}><Text style={{ fontSize: 20, borderWidth: 1, padding: 5 }}>Submit</Text></TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5
    },

    headerButton: {
        color: '#333333',
        fontSize: 30,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderWidth: 1,
        margin: 0
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    }


})