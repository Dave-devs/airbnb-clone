import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useRef, useState } from 'react'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { categories } from '@/interfaces/category';
import * as Haptics from 'expo-haptics';

interface Props {
    onCategoyChanged: (category: string) => void;
}

export default function ExploreHeader({ onCategoyChanged }: Props) {
    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const [activeIndex, setActiveIndex] = useState(1);

    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index)

        selected?.measure((x: number, y: number) => {
            scrollRef.current?.scrollTo({x: x - 16, y: y + 16, animated: true});
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        // Pass category at index to Listing view component
        onCategoyChanged(categories[index].name)
    };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        {/* White Canvas Component */}
        <View style={styles.subContainer}>
            {/* Search Bar & Filter Button Component */}
            <View style={styles.actionRow}>
                <Link href={'/(modals)/booking'} asChild>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name='search' size={24} />
                        <View>
                            <Text style={{fontFamily: 'outfit'}}>Where to?</Text>
                            <Text style={{fontFamily: 'outfitL', fontWeight: '100'}}>Anywhere · Any week · Add guests</Text>
                        </View>
                    </TouchableOpacity>
                </Link>

                <View style={styles.filterBtn}>
                    <Ionicons name='options-outline' size={24} />
                </View>
            </View>

            {/* Homes Options Scroll */}
            <ScrollView 
            ref={scrollRef}
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 30,
                paddingHorizontal: 18,
                marginTop: 10
            }}
            >
                {categories.map((item, index) => (
                    <TouchableOpacity 
                    onPress={() => selectCategory(index)}
                    key={index}
                    ref={(e) => itemsRef.current[index] = e}
                    style={activeIndex === index ? styles.activeCategoryBtn : styles.categoryBtn}
                    >
                        <MaterialIcons name={item.icon as any} size={24} color={activeIndex === index ? Colors.black : Colors.grey}/>
                        <Text style={activeIndex === index ? styles.activeCategoryText : styles.categoryText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

        </View>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
    },
    subContainer: {
        backgroundColor: Colors.white,
        paddingTop: 45,
        height: 165,
    },
    actionRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        gap: 10
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#A2A0A2',
        borderRadius: 24,
    },
    searchBtn: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        borderRadius: 30,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.black,
        backgroundColor: Colors.white,
        alignItems: 'center',
        width: 260,
        padding: 8,
        elevation: 10,
        shadowColor: Colors.black,
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    categoryText: {
        fontSize: 14,
        fontFamily: 'outfitM',
        color: Colors.grey,
    },
    activeCategoryText: {
        fontSize: 14,
        fontFamily: 'outfit',
        color: Colors.black,
    },
    categoryBtn:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
    },
    activeCategoryBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
        borderBottomColor: Colors.black,
        borderBottomWidth: 2
    }
})