import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NearbyJobCard, ScreenHeaderBtn } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import styles from "../../styles/search";

const JobSearch = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useFetch(`search`, {
    query: params.id,
    page,
  });

  const handlePagination = (direction) => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
    } else if (direction === "right") {
      setPage(page + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimensions="60%"
              handlePress={() => router.back()}
            />
          ),
        }}
      />
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      {/* {isLoading ? (
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      ) : error ? (
        <Text>There is an error</Text>
      ) : data.length === 0 ? (
        <Text>There is no jobs</Text>
      ) : ( */}
      <FlatList
        data={data ?? []}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{
          padding: SIZES.medium,
          rowGap: SIZES.medium,
        }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size={"large"} color={COLORS.primary} />
              ) : (
                error && <Text>Oops, something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination("right")}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {/* )} */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default JobSearch;
