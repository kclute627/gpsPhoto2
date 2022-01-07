import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { colors } from '../../theme'
import { styles } from './LoadingStyles'

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.gold}/>
        </View>
    )
}
