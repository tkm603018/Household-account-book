import React from 'react'
import { createContainer } from 'unstated-next';
import { DB } from '../firebase'

export const Body = () => {
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

  const [selectedItem, setSelectedItem] = React.useState('')

  const [itemKey, setItemKey] = React.useState()


  const [inputLink, setInputLink] = React.useState(`${new Date().getFullYear()}${new Date().getMonth()}`);
  const [link, setLink] = React.useState(`${new Date().getFullYear()}${new Date().getMonth()}`);
  const [bodies, setBodies] = React.useState();

  const [selectedBody, setSelectedBody] = React.useState('')


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
  const handleItemKey = (aa) => {
    setItemKey(aa);
  }
  
  const handleLink = (e) => {
  setInputLink(e.target.value);
  }
  const handleBodies = (data) => {
    setBodies(data)
  }
  const handleSelectedBody = (a) => {
    setSelectedBody(a)
  }


  const ItemStore = (itemKey, itemList) => {
    console.log('Call ItemStore', itemKey);
    var newItemList = DB.ref('bodies-'+itemKey).push()
    var postId = newItemList.key
    newItemList.set(JSON.stringify(Object.assign({ key: postId }, itemList)))
  };

  // CREATE_TASK
  const ItemAdd = () => {
    console.log('ItemAdd called')
    //VALIDATION
    console.log("inputYear", inputYear)
    if (!inputYear || inputYear.length > 4 ||
      (new Date().getMonth()===0? (Number(inputYear)-1):Number(inputYear)) > new Date().getFullYear()) {
      window.alert('正しい年付を入力してください.');
      return
    }
    console.log("inputMonth", inputMonth)
    if ((new Date().getMonth() === 0 ? (Number(inputMonth) + 12) : Number(inputMonth)) < 1 ||
      (new Date().getMonth() === 0 ? (Number(inputMonth) + 12) : Number(inputMonth)) > 12) {
      window.alert('正しい月付を入力してください.');
      return
    }

    if (inputDay < 1 || inputDay > 32) {
      window.alert('正しい日付を入力してください.');
      return
    }
    const newItem = {
      year: (new Date().getMonth()===0? (Number(inputYear)-1):Number(inputYear)),
      month: (new Date().getMonth()===0? (Number(inputMonth)+12):Number(inputMonth)),
      day: Number(inputDay),
      text: inputText,
      category: inputCategory,
      number: Number(inputNumber),
    };

    console.log('newItem', newItem);

    ItemStore(itemKey, newItem);

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
  const ItemDelete = (item) => {
    console.log('DELETE CALL KEY', item.key)
    const target = item
    console.log('target1',target)
  
    // Store(null)
    target && item.key && DB.ref('bodies-'+itemKey).child(item.key).remove().then(res => {
      console.log('res',res)
    }).catch(error => {
      console.log(error)
    })

  }

  // // SELECTED_TASK
  const ItemSelect = (item) => {
    if (!selectedItem) {
      setSelectedItem(item.key)
      const target = item
      console.log('selected', item)
      console.log('item.key', item.key)

      setKey(target.key)
      setInputYear(target.year)
      setInputMonth(target.month)
      setInputDay(target.day)
      setInputText(target.text)
      setInputCategory(target.category)
      setInputNumber(target.number)
    } else {
      setSelectedItem('')
      setKey(null)
      setInputYear()
      setInputMonth()
      setInputDay('')
      setInputText('')
      setInputCategory('')
      setInputNumber('')
    }

  }
  
  // // EDIT_TASK
  const ItemEdit = () => {
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

    selectedItem && DB.ref('bodies-'+itemKey).child(key).set(JSON.stringify(updateItem)).then(res => {
    console.log('res',res)
    }).catch(error => {
        console.log(error)
    })
    setKey(null)

    setSelectedItem(false)
  }


  const BodyStore = (bodyList) => {
    console.log('Call BodyStore', bodyList)
    var newBodyList = DB.ref('bodies').push()
    var postId = newBodyList.key
    newBodyList.set(JSON.stringify(Object.assign({ key: postId }, bodyList)))
  };
  


  // CREATE_TASK
  const BodyAdd = (e) => {
    console.log('BodyAdd called')
    
    //VALIDATION
    // if (!inputYear || inputYear.length > 4 || inputYear > new Date().getFullYear()) {
    //   window.alert('正しい年付を入力してください.');
    //   return
    // }

    const newBody = {
      link: inputLink,
      items: items,
    };

    console.log('newBody', newBody)
    setItems(items)
    BodyStore(newBody)
    setBodies(newBody)
  }

    // // DELETE_TASK
  const BodyDelete = (body) => {
    var confirm = window.confirm("ほんとに削除しますか？")
    // console.log("BodyDelete", confirm)
    console.log('DELETE CALL KEY', body)
    if (confirm) {
      body.key && DB.ref('bodies').child(body.key).remove().then(res => {
      }).catch(error => {
        console.log(error)
      })
      body.link && DB.ref('bodies-' + body.link).remove().then(res => {
      }).catch(error => {
        console.log(error)
      })
    } else {
    }

  }

  // // SELECTED_TASK
  const BodySelect = (body) => {
    setSelectedBody(body.key)
    if (!selectedBody) {
      const target = body
      console.log('selected', selectedBody)
      console.log('body.key', body.key)

      setKey(body.key)
      setInputLink(target.link)
    } else {
      setSelectedBody('')
      setKey(null)
      setInputLink()
    }

  }
  
  // // EDIT_TASK
  const BodyEdit = () => {
    var confirm = window.confirm("ほんとに更新しますか？")

    if (confirm) {
      if (selectedBody) {
        console.log("call Edit")
        const updateBody = {
          key: selectedBody,
          link: inputLink,
          items: items,
        };
        
        selectedBody && key && DB.ref('bodies').child(selectedBody).set(JSON.stringify(updateBody)).then(res => {
        }).catch(error => {
          console.log(error)
        })
        setKey(null)
        setSelectedBody(false)
      }
    }
  }

  return {
    inputYear, inputMonth, inputDay, inputText, inputCategory, inputCategories, inputNumber,
    handleYear, handleMonth, handleDay, handleText, handleCategory, handleCategories, handleNumber, handleItemKey, 
    year, month, day, text, category, categories, number, items, selectedItem,itemKey,
    ItemAdd, ItemDelete, ItemStore,
    ItemSelect, ItemEdit,

    handleLink, handleSelectedBody, inputLink, selectedBody,link, handleBodies, bodies, setLink,
    BodyAdd, BodyDelete, BodyStore,
    BodySelect, BodyEdit
  }
}

export const BodyContainer = createContainer(Body);
