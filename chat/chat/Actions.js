import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ActionSheet from 'react-native-actionsheet';

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.onActionsPress = this.onActionsPress.bind(this);
  }

  onActionsPress() {
     this.ActionSheet.show();
  }

  _handlePress(index){
   let i = 0;
      for (let key in this.props.options) {
        if (this.props.options.hasOwnProperty(key)) {
          if (index === i) {
            this.props.options[key](this.props);
            return;
          }
          i++;
        }
      }
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
    const options = Object.keys(this.props.options);
    const cancelButtonIndex = Object.keys(this.props.options).length - 1;
    
    return (
      <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={this.onActionsPress}>
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

Actions.contextTypes = {
  actionSheet: React.PropTypes.func,
};

Actions.defaultProps = {
  onSend: () => {},
  options: {},
  icon: null,
  containerStyle: {},
  iconTextStyle: {},
};

Actions.propTypes = {
  onSend: React.PropTypes.func,
  options: React.PropTypes.object,
  icon: React.PropTypes.func,
  containerStyle: View.propTypes.style,
  iconTextStyle: Text.propTypes.style,
};

module.exports = Actions;