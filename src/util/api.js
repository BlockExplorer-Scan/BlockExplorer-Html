import { get, post } from './https'
export const queryBlocks = p => post('/query/block/data', p); //查询全部区块
export const queryTransaction = p => post('/query/transaction/data', p); //查询全部交易
export const queryERC20 = p => post('/queryERC20ByContractAddress', p); //[ERC20]交易拆分
export const queryMainCoin = p => post('/queryMainCoinByContractAddress', p); //[交易处理]-主币内部转账
export const queryTransactionByValue = p => post('/queryTransactionByValue', p); //条件查询-交易
export const queryBlockByValue = p => post('/queryBlockByValue', p); // 条件查询-区块
export const queryERC20ByTransaction = p => post('/queryERC20ByTransaction', p); //[交易处理]-ERC20
export const queryCounts = p => post('/query/transaction/counts', p); //查询最近14天交易
