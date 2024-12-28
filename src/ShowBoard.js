import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Dimensions } from 'react-native';
import Board from './Board/Board';
import moveChess from './Move/moveChess';
import isWin from './Check/isWin';
const clone = require('lodash'); // 导入 lodash 库用于深拷贝

// ShowBoard 组件，接收多个 props 用于控制游戏状态和操作
const ShowBoard = ({ gameOver, flag, switchPlayer, setGameOver, backMove, setBackMove, refreshBoard, setRefreshBoard }) => {
    const [board, setBoard] = useState([]); // 当前棋盘状态
    const [canMoveBoard, setCanMoveBoard] = useState([]); // 可移动位置矩阵
    const [selectedPiece, setSelectedPiece] = useState(null); // 当前选中的棋子
    const [savedBoard, saveBoard] = useState(Board.init); // 悔棋保存的棋盘状态
    const initCanMoveBoard = () => { return Array.from(Array(10), () => Array(9).fill(false)); }; // 初始化可移动位置矩阵

    // 初始化棋盘状态
    useEffect(() => {
        setBoard(Board.board);
        setCanMoveBoard(initCanMoveBoard());
    }, []);

    // 处理悔棋逻辑
    useEffect(() => {
        if (backMove === true) {
            if (savedBoard === null) {
                alert("不允许连续悔棋!"); // 提示不允许连续悔棋
                return;
            }
            Board.board = savedBoard; // 恢复之前的棋盘状态
            setBoard(Board.board);
            switchPlayer(); // 切换玩家
            saveBoard(null); // 清空保存的棋盘状态
            setBackMove(false); // 设置悔棋标志为 false
        }
    }, [backMove]);

    // 处理刷新棋盘逻辑
    useEffect(() => {
        if (!refreshBoard) return;
        Board.board = clone.cloneDeep(Board.init); // 重置棋盘为初始状态
        setBoard(Board.board);
        setCanMoveBoard(initCanMoveBoard());
        setSelectedPiece(null); // 清空选中棋子
        saveBoard(null); // 清空保存的棋盘状态
        setBackMove(false); // 设置悔棋标志为 false
        setGameOver(false); // 设置游戏结束标志为 false
        setRefreshBoard(false); // 设置刷新标志为 false
    }, [refreshBoard]);

    const { width, height } = Dimensions.get('window'); // 获取屏幕尺寸
    const numRows = 10; // 棋盘行数
    const numCols = 9; // 棋盘列数
    const aspectRatio = numCols / numRows; // 棋盘的宽高比
    const ratio = width / height; // 屏幕宽高比

    let boardWidth, boardHeight;
    if (ratio > aspectRatio) {
        // 屏幕更宽，按高度计算
        boardHeight = height * 0.8;
        boardWidth = boardHeight * aspectRatio;
    } else {
        // 屏幕更高，按宽度计算
        boardWidth = width * 0.95;
        boardHeight = boardWidth / aspectRatio;
    }

    const cellWidth = boardWidth / numCols; // 单元格宽度
    const cellHeight = boardHeight / numRows; // 单元格高度

    // 渲染每个单元格
    const renderCell = (cell, rowIndex, colIndex) => {
        const fontSize = Math.min(cellWidth, cellHeight) * 0.6; // 动态设定字体大小
        const isBlackPiece = cell.type === 1; // 判断是否为黑方棋子
        const shouldRotate = ratio <= aspectRatio && isBlackPiece; // 屏幕更高且是黑方棋子就将机器旋转180度

        return (
            <TouchableOpacity
                key={`${rowIndex}-${colIndex}`}
                onPress={() => handleCellClick(rowIndex, colIndex)} // 点击事件处理
                style={[styles.cell, { width: cellWidth + 1, height: cellHeight + 1 }]}
            >
                {cell.type !== 0 && ( // 如果有棋子
                    <Text style={[
                        styles.chess,
                        { fontSize },
                        { color: cell.type === 2 ? 'red' : 'black' }, // 设置棋子颜色
                        shouldRotate && styles.rotatedChess // 需要旋转时应用旋转样式
                    ]}>
                        {cell.name}
                    </Text>
                )}
                {canMoveBoard[rowIndex][colIndex] && ( // 如果该位置可以移动
                    <View style={styles.intersection} /> // 显示可移动标记
                )}
            </TouchableOpacity>
        );
    };

    // 处理单元格点击事件
    const handleCellClick = (rowIndex, colIndex) => {
        const chess = board[rowIndex][colIndex];

        if (gameOver) return; // 如果游戏结束则不处理点击
        if (canMoveBoard[rowIndex][colIndex]) {
            // 如果点击的是一个可以移动到的位置
            if (selectedPiece) {
                saveBoard(clone.cloneDeep(Board.board)); // 保存当前棋盘状态
                if (moveChess(selectedPiece.row, selectedPiece.col, rowIndex, colIndex)) {
                    setBoard(Board.board); // 更新棋盘状态
                    setCanMoveBoard(initCanMoveBoard()); // 重置可移动位置矩阵
                    switchPlayer(); // 切换玩家
                    setSelectedPiece(null); // 移动后取消选中
                }
            }
        } else {
            // 如果点击的是己方棋子，则显示可移动位置
            if (chess.type === flag) {
                setSelectedPiece({ row: rowIndex, col: colIndex }); // 选中棋子
                let place = chess.canMove(rowIndex, colIndex); // 获取可移动位置
                let tmp = initCanMoveBoard();
                for (let i = 0; i < place.length; i++) {
                    tmp[place[i][0]][place[i][1]] = true; // 标记可移动位置
                }
                setCanMoveBoard(tmp); // 更新可移动位置矩阵
            }
        }
        if (isWin(1)) {
            alert("黑方获胜"); // 黑方获胜提示
            setGameOver(true); // 设置游戏结束标志为 true
        } else if (isWin(2)) {
            alert("红方获胜"); // 红方获胜提示
            setGameOver(true); // 设置游戏结束标志为 true
        }
    };

    return (
        <ImageBackground
            source={require('./images/board.jpg')} // 棋盘背景图片
            style={[styles.board, { width: boardWidth, height: boardHeight, marginTop: 10, marginHorizontal: (width - boardWidth) / 2 }]}
        >
            <View style={styles.boardContainer}>
                {board.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))} // 渲染每一行的单元格
                    </View>
                ))}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    board: {
        margin: 0,
        alignSelf: 'center',
        resizeMode: 'cover', // 确保图片覆盖整个区域
    },
    boardContainer: {
        marginBottom: 15,
        marginLeft: -5,
    },
    row: {
        flexDirection: 'row', // 行内元素水平排列
    },
    cell: {
        position: 'relative', // 确保子元素的绝对定位相对于当前单元格
        justifyContent: 'center', // 垂直居中
        alignItems: 'center', // 水平居中
    },
    rotatedChess: {
        transform: [{ rotate: '180deg' }], // 旋转棋子 180 度
    },
    intersection: {
        position: 'absolute',
        top: '50%',  // 调整垂直位置
        left: '50%', // 调整水平位置
        width: 5, // 圆点的宽度
        height: 5, // 圆点的高度
        borderRadius: 2.5, // 圆点的半径
        backgroundColor: 'white',
        transform: [{ translateX: -2.5 }, { translateY: -2.5 }], // 将圆点居中
    },
    chess: {
        position: 'absolute',
        top: '10%', // 调整垂直位置
        left: '10%', // 调整水平位置
        width: '80%', // 使用百分比确保棋子大小随单元格变化
        height: '80%', // 使用百分比确保棋子大小随单元格变化
        textAlign: 'center',
        borderRadius: 50,
        backgroundColor: 'wheat',
        fontFamily: 'monospace',
        fontWeight: '600',
        userSelect: 'none',
    },
});

export default ShowBoard;