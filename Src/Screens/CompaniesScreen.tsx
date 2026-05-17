import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { FONTS } from '../Utility/Fonts';
import { COLORS } from '../Utility/Colors';
import HOCView from '../Components/HOCView';
import SvgIcon from '../Components/SvgIcon';
import { useInsets } from '../Utility/StoreData';
import StyledText from '../Components/StyledText';
import useLoaderHook from '../Hooks/useLoaderHook';
import TextInputBox from '../Components/TextInputBox';
import { moderateScale } from '../Hooks/useMetrices';
import { GetClientServices } from '../Services/ApiServices';
import { getSubStringText } from '../Utility/GeneralUtility';
import IconWithStyledText from '../Components/IconWithStyledText';
import { ACTIVE_OPACITY, BOX_SHADOW } from '../Utility/Constants';
import ListEmptyComponent from '../Components/ListEmptyComponent';
import ListFooterComponent from '../Components/ListFooterComponent';
import { CompaniesStackParamsList } from '../@types/NavigationTypes';

const PAGE_LIMIT = 10;

export type CompaniesListItem = {
  client_idpk: number;
  client_name: string;
  client_email: string;
  client_mobile: number;
  client_location: string;
  client_status: number;
  client_addedby_useridfk: number | null;
  client_date: string;
  client_contactpersonname: string;
  client_latitude: number;
  client_longitude: number;
  client_updateddate: string;
  client_landline: string | null;
  client_customerid: string | null;
  client_pincode: string;
  client_country_idfk: number | null;
  client_state_idfk: number;
  client_zone_idfk: number;
  client_city_idfk: number;
  subscription_id: string;
  client_updatedby_useridfk: number | null;
  client_last_retagby_useridk: number | null;
  client_last_retag_date: string;
  client_lastmappingdatetime: string;
  client_retagcount: number | null;
  client_updatecount: number | null;
  category_idfk: number;
  stage_idfk: number;
  client_profileicon: string | null;
  client_profileicon_file_name: string | null;
  client_profileicon_mime_type: string | null;
  client_company: string | null;
  iswhitelist: number;
  iswhitelistpath: number;
  password: string | null;
  zone_name: string;
  category_name: string;
  stage_name: string;
  mappingtype: number;
};

export type LinkItem = {
  rel: string;
  href: string;
};

export type CompaniesListResponse = {
  items: CompaniesListItem[];
  hasMore: boolean;
  limit: number;
  offset: number;
  count: number;
  links: LinkItem[];
};

const INITIAL_COMPANIES_RESPONSE: CompaniesListResponse = {
  items: [],
  hasMore: true,
  limit: PAGE_LIMIT,
  offset: 0,
  count: 0,
  links: [],
};

const CompaniesScreen = () => {
  const { setLoading } = useLoaderHook();
  const insets = useInsets();
  const navigation =
    useNavigation<
      StackNavigationProp<CompaniesStackParamsList, 'CompaniesScreen'>
    >();
  const [companiesList, setCompaniesList] = useState<CompaniesListResponse>(
    INITIAL_COMPANIES_RESPONSE,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isListLoading, setIsListLoading] = useState(false);

  useEffect(() => {
    handleGetCompaniesList(0, true);
  }, []);

  const handleGetCompaniesList = async (
    nextOffset = 0,
    shouldReplace = false,
  ) => {
    if (shouldReplace) {
      setLoading(true);
    } else {
      setIsListLoading(true);
    }

    try {
      const params = {
        subscription_id: 'SUB22106',
        EMPLOYEE_ID: 177,
        offset: nextOffset,
        limit: PAGE_LIMIT,
      };

      const response = await GetClientServices(params);
      const responseData = response?.data as Partial<CompaniesListResponse>;
      const nextItems = Array.isArray(responseData?.items)
        ? responseData.items
        : [];

      setCompaniesList(previousState => {
        const mergedItems = shouldReplace
          ? nextItems
          : [...previousState.items, ...nextItems];

        return {
          items: mergedItems,
          hasMore:
            typeof responseData?.hasMore === 'boolean'
              ? responseData.hasMore
              : nextItems.length === PAGE_LIMIT,
          limit: responseData?.limit ?? PAGE_LIMIT,
          offset: responseData?.offset ?? nextOffset,
          count: responseData?.count ?? mergedItems.length,
          links: Array.isArray(responseData?.links) ? responseData.links : [],
        };
      });
    } catch (error) {
      console.log('ERROR FROM API', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
      setIsListLoading(false);
    }
  };

  const onEndReached = () => {
    if (isListLoading || isRefreshing || !companiesList.hasMore) {
      return;
    }

    const nextOffset = companiesList.items.length;
    handleGetCompaniesList(nextOffset, false);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    handleGetCompaniesList(0, true);
  };

  const renderItem = ({ item }: { item: CompaniesListItem }) => {
    return (
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        onPress={() => navigation?.navigate('CalendarScreen')}
        style={styles.itemContainer}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <SvgIcon icon="smallLogo" />
            <StyledText style={styles.clientName}>
              {getSubStringText(item.client_name, 25)}
            </StyledText>
          </View>
          <View style={styles.headerContent}>
            <StyledText>Re-tag</StyledText>
            <SvgIcon icon="location" />
          </View>
        </View>

        <StyledText style={styles.clientLocation}>
          {item.client_location || '-'}
        </StyledText>

        <IconWithStyledText
          icon="user"
          title={item.client_contactpersonname}
          size={15}
          isShowUnderLine={false}
        />

        <View style={styles.contactDetails}>
          <IconWithStyledText
            size={15}
            icon="phone"
            color={COLORS.primary}
            title={item.client_mobile?.toString()}
          />
          <IconWithStyledText
            size={15}
            icon="email"
            title={item.client_email}
            color={COLORS.primary}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const headerComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <TextInputBox
          customContainerStyle={{
            width: '90%',
          }}
          inputContainerStyle={{
            borderRadius: moderateScale(50),
          }}
          iconSize={18}
          placeHolder="Search..."
          LeftIcon="searchIcon"
          borderColor={COLORS.transparent}
        />
        <SvgIcon icon="filter" />
      </View>
    );
  };

  return (
    <HOCView
      headerProps={{
        isEnableRight: true,
        title: `Companies ${
          companiesList.items?.length ? `(${companiesList.items.length})` : ''
        }`,
      }}
      floatingBtnTitle="Company"
      floatingBtnLeftIcon="plus"
      renderHeader={headerComponent}
    >
      <FlatList
        data={companiesList.items}
        renderItem={renderItem}
        removeClippedSubviews={false}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: 60 + (insets?.bottom ?? 0),
          },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
        ListEmptyComponent={<ListEmptyComponent />}
        ListFooterComponent={isListLoading ? <ListFooterComponent /> : null}
      />
    </HOCView>
  );
};

export default CompaniesScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  clientName: {
    fontFamily: FONTS.semiBold,
  },
  contactDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
  },
  itemContainer: {
    ...BOX_SHADOW,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  clientLocation: {
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});
