import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import ActionSheet from 'react-native-actionsheet';

class ActionsIOS extends React.Component {
  constructor(props) {
    super(props);
    this._images = [];
    this.state = {
      modalVisible: false,
    };
    this.onActionsPress = this.onActionsPress.bind(this);
    this.selectImages = this.selectImages.bind(this);
  }

  setImages(images) {
    this._images = images;
  }

  getImages() {
    return this._images;
  }

  setModalVisible(visible = false) {
    this.setState({modalVisible: visible});
  }

  onActionsPress() {
    this.ActionSheet.show();
  }

  _handlePress(index){
     switch (index) {
        case 0:
          this.setModalVisible(true);
          break;
        case 1:
          //todo 拍照logic
          break;
        default:
      }
  }

  selectImages(images) {
    this.setImages(images);
  }

  renderNavBar() {
    return (
      <NavBar style={{
        statusBar: {
          backgroundColor: '#FFF',
        },
        navBar: {
          backgroundColor: '#FFF',
        },
      }}>
        <NavButton onPress={() => {
          this.setModalVisible(false);
        }}>
          <NavButtonText style={{
            color: '#000',
          }}>
            {'取消'}
          </NavButtonText>
        </NavButton>
        <NavTitle style={{
          color: '#000',
        }}>
          {'相册'}
        </NavTitle>
        <NavButton onPress={() => {
          this.setModalVisible(false);
          const images = this.getImages().map((image) => {
            return {
              image: image.uri,
            };
          });
          this.props.onSend(images);
          this.setImages([]);
        }}>
          <NavButtonText style={{
            color: '#000',
          }}>
            {'发送'}
          </NavButtonText>
        </NavButton>
      </NavBar>
    );
  }

  renderIcon() {
    if (this.props.icon) {
      return this.props.icon();
    }
    return (
      <View style={[styles.wrapper, this.props.wrapperStyle]} >
        <Text style={[styles.iconText, this.props.iconTextStyle]}>
          +
        </Text>
      </View>
    );
  }

  render() {
    const options = ['从相册选择', '拍照', '取消'];
    const cancelButtonIndex = options.length - 1;
    return (
      <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={this.onActionsPress}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
        {this.renderNavBar()}
        <CameraRollPicker
          maximum={10}
          imagesPerRow={4}
          callback={this.selectImages}
          selected={[]}
        />
        </Modal>
        {this.renderIcon()}
         <ActionSheet 
          ref={(component) => this.ActionSheet = component}
          options={options}
          cancelButtonIndex={cancelButtonIndex}
          onPress={this._handlePress.bind(this)}
          />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

ActionsIOS.contextTypes = {
  actionSheet: React.PropTypes.func,
};

ActionsIOS.defaultProps = {
  onSend: () => {},
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

ActionsIOS.propTypes = {
  onSend: React.PropTypes.func,
  options: React.PropTypes.object,
  icon: React.PropTypes.func,
  containerStyle: View.propTypes.style,
  wrapperStyle: View.propTypes.style,
  iconTextStyle: Text.propTypes.style,
};

module.exports = ActionsIOS;
