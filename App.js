import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, Dimensions } from 'react-native';
import ShowBoard from './ShowBoard';
import Board from './src/Board/Board';

const App = () => {
    const { width, height } = Dimensions.get('window');
    const aspectRatio = 0.9;

    const [gameOver, setGameOver] = useState(false);
    const [flag, setFlag] = useState(2); // 1 表示黑方，2 表示红方
    const [backMove, setBackMove] = useState(false);
    const switchPlayer = () => setFlag(3 - flag); // 切换玩家

    // 计算按钮和文字的样式
    const buttonWidth = width * 0.2; // 按钮宽度为屏幕宽度的 20%
    const buttonHeight = height * 0.05; // 按钮高度为屏幕高度的 5%
    let fontSizePlayerText = height * 0.05;
    if (width / height > 1)
        fontSizePlayerText = height * 0.05;
    else
        fontSizePlayerText = width * 0.05;
    // 玩家名字体大小为屏幕高度的 5%
    const fontSizeButtonText = height * 0.03; // 按钮文字字体大小为屏幕高度的 3%

    // 判断设备类型
    if (width / height > aspectRatio) {
        return (
            <SafeAreaView style={styles.container}>
                <ShowBoard gameOver={gameOver} flag={flag} switchPlayer={switchPlayer} setGameOver={setGameOver} backMove={backMove} setBackMove={setBackMove} />
                <View style={styles.buttonContainer}>
                    {/* 红方按钮组 */}
                    <View style={styles.playerGroup}>
                        <Text style={[styles.playerText, { fontSize: fontSizePlayerText }]}>红方</Text>
                        <View style={styles.buttonGroup}>
                            <CustomButton
                                title="认输"
                                color="#FF0000"
                                onPress={() => {
                                    if (flag === 2) { // 只允许红方认输
                                        alert('红方认输');
                                        setGameOver(true);
                                    } else {
                                        alert('现在不是红方回合，无法认输！');
                                    }
                                }}
                                buttonWidth={buttonWidth}
                                buttonHeight={buttonHeight}
                                fontSize={fontSizeButtonText}
                            />
                            <CustomButton
                                title="悔棋"
                                color="#FF0000"
                                onPress={() => {
                                    console.log('红方悔棋');
                                    setBackMove(true);
                                }}
                                disabled={flag === 2}
                                buttonWidth={buttonWidth}
                                buttonHeight={buttonHeight}
                                fontSize={fontSizeButtonText}
                            />
                        </View>
                    </View>
                    {/* 黑方按钮组 */}
                    <View style={styles.playerGroup}>
                        <Text style={[styles.playerText, { fontSize: fontSizePlayerText }]}>黑方</Text>
                        <View style={styles.buttonGroup}>
                            <CustomButton
                                title="认输"
                                color="#000000"
                                onPress={() => {
                                    if (flag === 1) { // 只允许黑方认输
                                        alert('黑方认输');
                                        setGameOver(true);
                                    } else {
                                        alert('现在不是黑方回合，无法认输！');
                                    }
                                }}
                                buttonWidth={buttonWidth}
                                buttonHeight={buttonHeight}
                                fontSize={fontSizeButtonText}
                            />
                            <CustomButton
                                title="悔棋"
                                color="#000000"
                                onPress={() => {
                                    console.log('黑方悔棋');
                                    setBackMove(true);
                                }}
                                disabled={flag === 1}
                                buttonWidth={buttonWidth}
                                buttonHeight={buttonHeight}
                                fontSize={fontSizeButtonText}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    } else { // 屏幕更高，按宽度计算
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.mobileLayout}>
                    {/* 黑方按钮组 */}
                    <View style={styles.playerGroup}>
                        <Text style={[styles.blackPlayerText, { fontSize: fontSizePlayerText }]}>黑方</Text>
                        <View style={styles.buttonGroup}>
                            <CustomButton
                                title="悔棋"
                                color="#000000"
                                onPress={() => {
                                    console.log('黑方悔棋');
                                    setBackMove(true);
                                }}
                                disabled={flag === 2}
                                buttonWidth={buttonWidth}
                                buttonHeight={buttonHeight}
                                fontSize={fontSizeButtonText}
                                buttonTextStyles={styles.blackButtonText}
                            />
                            <CustomButton
                                title="认输"
                                color="#000000"
                                onPress={() => {
                                    if (flag === 1) { // 只允许黑方认输
                                        alert('黑方认输');
                                        setGameOver(true);
                                    } else {
                                        alert('现在不是黑方回合，无法认输！');
                                    }
                                }}
                                buttonWidth={buttonWidth}
                                buttonHeight={buttonHeight}
                                fontSize={fontSizeButtonText}
                                buttonTextStyles={styles.blackButtonText}
                            />

                        </View>
                    </View>
                    <ShowBoard gameOver={gameOver} flag={flag} switchPlayer={switchPlayer} setGameOver={setGameOver} backMove={backMove} setBackMove={setBackMove} />
                    {/* 红方按钮组 */}
                    <View style={styles.playerGroup}>
                        <Text style={[styles.playerText, { fontSize: fontSizePlayerText }]}>红方</Text>
                        <View style={styles.buttonGroup}>
                            <CustomButton
                                title="认输"
                                color="#FF0000"
                                onPress={() => {
                                    if (flag === 2) { // 只允许红方认输
                                        alert('红方认输');
                                        setGameOver(true);
                                    } else {
                                        alert('现在不是红方回合，无法认输！');
                                    }
                                }}
                                buttonWidth={buttonWidth}
                                buttonHeight={buttonHeight}
                                fontSize={fontSizeButtonText}
                            />
                            <CustomButton
                                title="悔棋"
                                color="#FF0000"
                                onPress={() => {
                                    console.log('红方悔棋');
                                    setBackMove(true);
                                }}
                                disabled={flag === 1}
                                buttonWidth={buttonWidth}
                                buttonHeight={buttonHeight}
                                fontSize={fontSizeButtonText}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
};

const CustomButton = ({ title, onPress, color, buttonWidth, buttonHeight, fontSize, buttonTextStyles, disabled }) => (
    <TouchableOpacity
        style={[styles.customButton, { backgroundColor: color, width: buttonWidth, height: buttonHeight }]}
        onPress={onPress}
        disabled={disabled}
    >
        <Text style={[styles.buttonText, { fontSize }, buttonTextStyles]}>
            {title}
        </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobileLayout: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row', // 水平排列两组
        justifyContent: 'space-around', // 保持组间距
        width: '80%', // 按钮区域占屏幕宽度的 80%
    },
    playerGroup: {
        flexDirection: 'row', // 水平排列“玩家名”和按钮组
        alignItems: 'center', // 垂直方向居中
    },
    playerText: {
        color: '#000', // 文字颜色
        marginRight: 20, // 玩家名与按钮之间的间隔
    },
    blackPlayerText: {
        color: '#000', // 文字颜色
        marginRight: 20, // 玩家名与按钮之间的间隔
        transform: [{ rotate: '180deg' }], // 旋转180度
    },
    buttonGroup: {
        flexDirection: 'column', // 垂直排列按钮
        alignItems: 'center', // 按钮居中
        justifyContent: 'space-between', // 组内按钮均匀分布
    },
    customButton: {
        borderRadius: 5, // 圆角
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10, // 按钮之间的间距
    },
    buttonText: {
        color: '#fff', // 按钮文字颜色
        textAlign: 'center',
    },
    blackButtonText: {
        color: '#fff', // 按钮文字颜色
        textAlign: 'center',
        transform: [{ rotate: '180deg' }], // 旋转180度
    },
});

export default App;