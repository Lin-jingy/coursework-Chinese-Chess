import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Dimensions, Alert } from 'react-native';
import Board from './src/Board/Board';
import moveChess from './src/Move/moveChess'
import isWin from './src/Check/isWin';
const clone = require('lodash');

const ShowBoard = ({ gameOver, flag, switchPlayer, setGameOver, backMove, setBackMove, refreshBoard, setRefreshBoard }) => {
    const [board, setBoard] = useState([]);
    const [canMoveBoard, setCanMoveBoard] = useState([]);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [savedBoard, saveBoard] = useState(Board.init);
    const initCanMoveBoard = () => { return Array.from(Array(10), () => Array(9).fill(false)); };


    useEffect(() => {
        setBoard(Board.board);
        setCanMoveBoard(initCanMoveBoard());
    }, []);
    useEffect(() => {
        if (backMove === true) {
            if (savedBoard === null) {
                alert("不允许连续悔棋!");
                return;
            }
            Board.board = savedBoard;
            setBoard(Board.board);
            switchPlayer();
            saveBoard(null);
            setBackMove(false);
        }
    }, [backMove]);

    useEffect(() => {
        if (!refreshBoard) return;
        Board.board = clone.cloneDeep(Board.init);
        setBoard(Board.board);
        setCanMoveBoard(initCanMoveBoard());
        setSelectedPiece(null);
        saveBoard(null);
        setBackMove(false);
        setGameOver(false);
        setRefreshBoard(false);
    }, [refreshBoard]);

    const { width, height } = Dimensions.get('window');
    const numRows = 10;
    const numCols = 9;
    const aspectRatio = numCols / numRows; // 棋盘的宽高比
    const ratio = width / height;

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

    const cellWidth = boardWidth / numCols;
    const cellHeight = boardHeight / numRows;

    const renderCell = (cell, rowIndex, colIndex) => {
        const fontSize = Math.min(cellWidth, cellHeight) * 0.6;//动态设定大小
        const isBlackPiece = cell.type === 1;
        const shouldRotate = ratio <= aspectRatio && isBlackPiece; // 屏幕更高且是黑方棋子就将机器旋转180度

        return (
            <TouchableOpacity   //只有子组件才会有变透明的效果，而不是每一个单元格都会有
                key={`${rowIndex}-${colIndex}`}
                onPress={() => handleCellClick(rowIndex, colIndex)}
                style={[styles.cell, { width: cellWidth + 1, height: cellHeight + 1 }]}
            >

                {cell.type !== 0 && (
                    <Text style={[
                        styles.chess,
                        { fontSize },
                        { color: cell.type === 2 ? 'red' : 'black' },
                        shouldRotate && styles.rotatedChess
                    ]}>
                        {cell.name}
                    </Text>
                )}
                {canMoveBoard[rowIndex][colIndex] && (
                    <View style={styles.intersection} />
                )}
            </TouchableOpacity>
        );
    };


    const handleCellClick = (rowIndex, colIndex) => {
        const chess = board[rowIndex][colIndex];

        if (gameOver) return;
        if (canMoveBoard[rowIndex][colIndex]) {
            // 如果点击的是一个可以移动到的位置
            if (selectedPiece) {
                saveBoard(clone.cloneDeep(Board.board));
                if (moveChess(selectedPiece.row, selectedPiece.col, rowIndex, colIndex)) {
                    setBoard(Board.board);
                    setCanMoveBoard(initCanMoveBoard());
                    switchPlayer(); // 切换玩家
                    setSelectedPiece(null); // 移动后取消选中
                }
            }
        } else {
            // 如果点击的是己方棋子，则显示可移动位置
            if (chess.type === flag) {
                setSelectedPiece({ row: rowIndex, col: colIndex });
                let place = chess.canMove(rowIndex, colIndex);
                let tmp = initCanMoveBoard();
                for (let i = 0; i < place.length; i++) {
                    tmp[place[i][0]][place[i][1]] = true;
                }
                setCanMoveBoard(tmp);
            }
        }
        if (isWin(1)) {
            alert("黑方获胜");
            setGameOver(true);
        } else if (isWin(2)) {
            alert("红方获胜");
            setGameOver(true);
        }
    };
    return (
        <ImageBackground
            source={require('./images/board.jpg')}
            style={[styles.board, { width: boardWidth, height: boardHeight, marginTop: 10, marginHorizontal: (width - boardWidth) / 2 }]}
        >
            <View style={styles.boardContainer}>
                {board.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
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
        flexDirection: 'row',
    },
    cell: {
        position: 'relative', // 确保子元素的绝对定位相对于当前单元格
        justifyContent: 'center', // 垂直居中
        alignItems: 'center', // 水平居中
    },
    rotatedChess: {
        transform: [{ rotate: '180deg' }],
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