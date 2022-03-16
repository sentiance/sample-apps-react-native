import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import CollectingData from '../../components/CollectingData';
import Box from '../../components/Box';
import InfoText from '../../components/InfoText';
import Badge from '../../components/Badge';
import TextView from '../../components/TextView';
import Button from '../../components/Button';

const Dashboard = () => {
  return (
    <ScrollView>
      <View style={styles.contentView}>
        <View style={styles.boxView}>
          <CollectingData status="success" />
          <Box>
            <Badge
              statusText="Initialized"
              status="success"
              title="Init status"
            />
            <View style={styles.divider} />
            <Badge statusText="Started" status="success" title="SDK status" />
          </Box>
          <Box>
            <InfoText
              title="User ID"
              text="643988d9u23j842191h919"
              isCopyable={true}
            />
            <InfoText title="Install ID" text="6439jkbadk24928000ka001" />
            <InfoText
              title="External user ID (user linking)"
              text="6439jkbadk24928000ka001"
            />
          </Box>
          <Box>
            <Text style={styles.permissionHeadingText}>Permissions status</Text>
            <View style={styles.divider} />
            <TextView title="Location" status="success" />
            <View style={styles.divider} />
            <TextView title="Motion" status="success" />
            <View style={styles.divider} />
            <Text style={styles.permissionText}>All permissions provided</Text>
          </Box>
          <Button onClick={() => {}} text="Stop SDK" />
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
