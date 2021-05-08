import React from 'react'
import { createContainer } from 'unstated-next';
// import { BodyContainer } from './body';
import { DB } from '../firebase'
const ref = DB.ref('bodies')
// console.log('DB', DB.ref())

export const Item = () => {
  
  const [inputYear, setInputYear] = React.useState(new Date().getFullYear())
  const [inputMonth, setInputMonth] = React.useState(new Date().getMonth())
  const [inputDay, setInputDay] = React.useState()
  const [inputText, setInputText] = React.useState('')
  const [inputCategory, setInputCategory] = React.useState()
  const [inputCategories, setInputCategories] = React.useState([])
  const [inputNumber, setInputNumber] = React.useState()

  const [items, setItems] = React.useState();

  const [key, setKey] = React.useState('')
  const [year, setYear] = React.useState()
  const [month, setMonth] = React.useState()
  const [day, setDay] = React.useState()
  const [text, setText] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [categories, setCategories] = React.useState([])
  const [number, setNumber] = React.useState()

  const [selected, setSelected] = React.useState('')

  const [itemKey, setItemKey] = React.useState('')

  const handleYear = (e) => {
    setInputYear(e.target.value);
  }
  const handleMonth = (e) => {
    setInputMonth(e.target.value);
  }
  const handleDay = (e) => {
    setInputDay(e.target.value);
  }
  const handleText = (e) => {
    setInputText(e.target.value);
  }
  const handleCategory = (e) => {
    setInputCategory(e.target.value);
  }
  const handleCategories = (e) => {
    setInputCategories(e.target.value);
  }
  const handleNumber = (e) => {
    setInputNumber(e.target.value);
  }
    const handleItemKey = (e) => {
    setItemKey(e.target.value);
  }

  const Store = (itemKey, itemList) => {
    console.log('Call Store', itemList);
    // console.log('itemKeyyyyyy', itemKey);
    var newItemList = DB.ref('bodies/'+itemKey).push()
    var postId = newItemList.key
    newItemList.set(JSON.stringify(Object.assign({ key: postId }, itemList)))
  };

  // CREATE_TASK
  const ItemAdd = (itemKey) => {
    console.log('ItemAdd called')
    console.log('itemKeyyyyyy', itemKey);
    
    //VALIDATION
    // if (!inputYear || inputYear.length > 4 || inputYear > new Date().getFullYear()) {
    //   window.alert('正しい年付を入力してください.');
    //   return
    // }

    // if (inputMonth < 1 || inputMonth > 12) {
    //   window.alert('正しい月付を入力してください.');
    //   return
    // }

    // if (inputDay < 1 || inputDay > 32) {
    //   window.alert('正しい日付を入力してください.');
    //   return
    // }

    const newItem = {
      year: Number(inputYear),
      month: Number(inputMonth),
      day: Number(inputDay),
      text: inputText,
      category: inputCategory,
      number: Number(inputNumber),
    };

    console.log('newItem', newItem);

    Store(itemKey, newItem);

    setItems(newItem)
    setYear()
    setInputYear()
    setMonth()
    setInputMonth()
    setDay()
    setInputDay()
    setText()
    setInputText()
    setCategory()
    setCategories()
    setInputCategory()
    setNumber()
    setInputNumber()
  }

    // // DELETE_TASK
  const ItemDelete = (itemKey, newItem) => {
    console.log('DELETE CALL KEY', newItem.key)
    const target = newItem
    console.log('target1',target)
  
    // Store(null)
    target && newItem.key && DB.ref('bodies/'+itemKey).child(newItem.key).remove().then(res => {
      console.log('res',res)
    }).catch(error => {
      console.log(error)
    })

  }

  // // SELECTED_TASK
  const ItemSelect = (item) => {
    if (!selected) {
      setSelected(item.key)
      const target = item
      console.log('item.category', item.category)
      console.log('item.key', item.key)

      setKey(target.key)
      setInputYear(target.year)
      setInputMonth(target.month)
      setInputDay(target.day)
      setInputText(target.text)
      setCategory(target.category)
      setInputNumber(target.number)
    } else {
      setSelected('')
      setKey(null)
      setInputYear()
      setInputMonth()
      setInputDay()
      setInputText('')
      setInputCategory('')
      setInputNumber()
    }

  }
  
  // // EDIT_TASK
  const ItemEdit = (itemKey) => {
    console.log("call Edit")
    const updateItem = {
      key: key,
      year: Number(inputYear),
      month: Number(inputMonth),
      day: Number(inputDay),
      text: inputText,
      category: inputCategory,
      number: Number(inputNumber),
    };

    selected && DB.ref('bodies/'+itemKey).child(key).set(JSON.stringify(updateItem)).then(res => {
    console.log('res',res)
    }).catch(error => {
        console.log(error)
    })
    setKey(null)

    setSelected(false)
  }


  return {
    inputYear, inputMonth, inputDay, inputText, inputCategory, inputNumber,
    handleYear, handleMonth, handleDay, handleText, handleCategory, handleCategories, handleNumber, handleItemKey, 
    year, month, day, text, category, categories, number, items, selected,
    ItemAdd, ItemDelete, Store,
    ItemSelect, ItemEdit
  }
}

export const ItemContainer = createContainer(Item);
