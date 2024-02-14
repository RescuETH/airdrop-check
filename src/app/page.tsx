"use client"
import { Button, Card, Input, List, Typography, Divider } from 'antd';
import { useState } from 'react';
const { TextArea } = Input;

const info = {
  github: {
    list: [
      'github/github-0.json',
      'github/github-1.json'
    ],
    data: [],
    length: 147450
  },
  eth: {
    list: [
      'eth/eth-0.json',
      'eth/eth-1.json',
      'eth/eth-2.json',
      'eth/eth-3.json',
      'eth/eth-4.json',
      'eth/eth-5.json',
      'eth/eth-6.json',
    ],
    data: [],
    length: 518105
  },
  starknet: {
    list: [
      'stark_key/stark_key-0.json',
      'stark_key/stark_key-1.json',
      'starknet/starknet-0.json',
      'starknet/starknet-1.json',
      'starknet/starknet-2.json',
      'starknet/starknet-3.json',
      'starknet/starknet-4.json',
      'starknet/starknet-5.json',
      'starknet/starknet-6.json',
    ],
    data: [],
    length: 632177
  }
}

export default function Home() {
  const [activeTabKey2, setActiveTabKey2] = useState<string>('eth');
  const [text, setText] = useState<string>('')

  const [data, setData] = useState<string[]>([])
  // let data: any[] | undefined = [];

  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
    setText('');
  };

  const fetchData = async () => {
    if (info[activeTabKey2 as keyof typeof info].data.length !== info[activeTabKey2 as keyof typeof info].length ) {
      for (const v of info[activeTabKey2 as keyof typeof info].list) {
        const res = await fetch(v)
        const data = await res.json()
        info[activeTabKey2 as keyof typeof info].data = info[activeTabKey2 as keyof typeof info].data.concat(data['eligibles'])
      }
    }
  }

  const query = async () => {
    await fetchData()
    // console.log(info[activeTabKey2 as keyof typeof info].data.length)

    const list = text.split('\n').map(v => v.toLowerCase())
    let temp: {identity: string, amount: number}[] = info[activeTabKey2 as keyof typeof info].data.filter((v: {identity: string, amount: number}) => {
      return list.includes(v.identity)
    })
    console.log(temp)
    setData(temp.map(v => `${v.identity} | ${v.amount}`))
  }

  const tabListNoTitle = [
    {
      key: 'eth',
      label: 'eth',
    },
    {
      key: 'starknet',
      label: 'starknet',
    },
    {
      key: 'github',
      label: 'github',
    },
  ];

  return (
    <div>
      <Card
        style={{ width: '100%' }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        // tabBarExtraContent={<a href="#">More</a>}
        onTabChange={onTab2Change}
        tabProps={{
          size: 'middle',
        }}
      >
        {/*{contentListNoTitle[activeTabKey2]}*/}
        <TextArea rows={10} placeholder="输入你的地址，每行一个" value={text} onChange={e => setText(e.target.value)} />
        <Button onClick={query}>查询</Button>
        <Divider orientation="left">结果</Divider>
        <List
          header={<div>查询结果</div>}
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
