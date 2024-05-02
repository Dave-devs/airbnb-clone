import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { memo } from 'react'
import Colors from '@/constants/Colors'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'rs-react-native-map-clustering';
import { ListingGeo } from '@/interfaces/listingGeo';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface Props {
    listings: any;
}

// To set user region
const INITIAL_REGION = {
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 6,
    longitudeDelta: 6,
};

const MapListing = memo(({ listings }: Props) => {
    const router = useRouter();

    // To navigate to the listing deatails based on selected marker on map
    const onMarkerSelected = (item: ListingGeo) => {
        router.push(`/listing/${item.properties.id}`)
    }

    // Custom Cluster
    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster;
        const points = properties.point_count;

        return (
            <Marker
                key={`cluster-${id}`}
                coordinate={{ latitude: geometry.coordinates[0], longitude: geometry.coordinates[1] }}
                onPress={onPress}
            >
                <View style={styles.marker}>
                    <Text style={{ alignItems: 'center', fontFamily: 'outfit' }}>{points}</Text>
                </View>
            </Marker>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <MapView
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                initialRegion={INITIAL_REGION}
                animationEnabled={false}
                clusterColor={Colors.white}
                clusterTextColor={Colors.black}
                clusterFontFamily='outfit'
                renderCluster={renderCluster}
                zoomEnabled={true}
            >
                {listings.features.map((item: ListingGeo) => (
                    <Marker
                        key={item.properties.id}
                        onPress={() => onMarkerSelected(item)}
                        coordinate={{ latitude: +item.properties.latitude, longitude: +item.properties.longitude }}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>${item.properties.price}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    marker: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        padding: 6,
        borderRadius: 10,
        elevation: 5,
        shadowColor: Colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10
        }
    },
    markerText: {
        fontFamily: 'outfit',
        fontSize: 12,
    }
})

export default MapListing