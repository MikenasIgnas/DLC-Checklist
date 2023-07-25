/* eslint-disable max-len */
import { AppstoreAddOutlined } from '@ant-design/icons'
import { Button, Collapse, Divider, Form, Input, Modal, Select } from 'antd'
import React from 'react'
import type { CollapseProps } from 'antd'
import { TreeSelect } from 'antd'
import { useForm } from 'antd/es/form/Form'
const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
)

const treeData = [
  {
    title:    'RA-3',
    value:    '0-0-0',
    key:      '0-0-0',
    children: [
      {value: 'S1.1', title: 'S1.1'},
      {value: 'S1.2', title: 'S1.2'},
    ],
  },
  {
    title:    'RA-2',
    value:    '0-0-1',
    key:      '0-0-1',
    children: [
      {value: 'S1', title: 'S1.1'},
      {value: 'S2', title: 'S1.2'},
    ],
  },
]

const treeData2 = [
  {
    title:    'C1',
    value:    '0-1-0',
    key:      '0-1-0',
    children: [
      {value: 'C1-S1.1', title: 'S1.1'},
      {value: 'C1-S1.2', title: 'S1.2'},
    ],
  },
  {
    title:    'C2',
    value:    '0-1-1',
    key:      '0-1-1',
    children: [
      {value: 'C2-S1.1', title: 'S1.1'},
      {value: 'C2-S1.2', title: 'S1.2'},
    ],
  },
  {
    title:    'C3',
    value:    '0-1-2',
    key:      '0-1-2',
    children: [
      {value: 'C3-S1.1', title: 'S1.1'},
      {value: 'C3-S1.2', title: 'S1.2'},
    ],
  },
  {
    title:    'C4',
    value:    '0-1-3',
    key:      '0-1-3',
    children: [
      {value: 'C4-S1.1', title: 'S1.1'},
      {value: 'C4-S1.2', title: 'S1.2'},
    ],
  },
]


const addedCompany = [
  {
    companyName:  'Bite',
    companyId:    '1',
    companySites: [
      {
        site:       'T72',
        colocation: [
          { premiseName: 'RA-3',
            rack:        ['S1.1','S1.2','S1.3'],
          },
          { premiseName: 'DC-5',
            rack:        ['S2.1','S2.2','S2.3'],
          },
        ],
      },
    ],
  },
  {
    companyName:  'Ignitis',
    companyId:    '2',
    companySites: [
      {
        site:       'J13',
        colocation: [
          { premiseName: 'DC-3C',
            rack:        ['S5.1','S5.2','S5.3'],
          },
          { premiseName: 'DC-5',
            rack:        ['S7.1','S7.2','S7.3'],
          },
        ],
      },
    ],
  },
]

const CompanyAddition = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [form] = useForm()
  const [value, setValue] = React.useState(['0-0-0'])
  const { Panel } =                     Collapse
  // const onChange = (newValue: string[]) => {
  //   console.log(newValue)
  //   setValue(newValue)
  // }

  // const tProps = {
  //   treeData,
  //   value,
  //   onChange,
  //   treeCheckable: true,
  //   placeholder:   'Please select',
  //   style:         {
  //     width: '100%',
  //   },
  // }

  // const tProps2 = {
  //   treeData2,
  //   value,
  //   onChange,
  //   treeCheckable: true,
  //   placeholder:   'Please select',
  //   style:         {
  //     width: '100%',
  //   },
  // }
  const addCompany = (values: any) => {
    const company = [
      {
        companyName:  values.CompanyName,
        companySites: [
          {
            site:       values.CompanySiteJ13,
            colocation: [
              {
                premiseName: values.PremiseName,
                racks:       values.CompanyColocationsJ13,
              },
            ],
          },
        ],
      },
    ]
    console.log(company)
    setIsModalOpen(false)
  }
  const onChange = (key: string | string[]) => {
    console.log(key)
  }
  return (
    <div>
      <Button icon={<AppstoreAddOutlined />} onClick={()=> setIsModalOpen(true)}>Pridėti įmonę</Button>
      <Modal
        title='Pridėkite įmonę'
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        cancelButtonProps = {{style: { display: 'none' }}}
        okButtonProps={{ style: { display: 'none' }}}
      >
        <Form form={form} onFinish={addCompany}>
          <Divider orientation='left'>J-13</Divider>
          <Collapse ghost defaultActiveKey={['1']} onChange={onChange}>
            <Panel header='This is panel header 1' key='1'>
              <p>{text}</p>
            </Panel>
            <Panel header='This is panel header 2' key='2'>
              <p>{text}</p>
            </Panel>
            <Panel header='This is panel header 3' key='3'>
              <p>{text}</p>
            </Panel>
          </Collapse>
          <Divider orientation='left'>T-72</Divider>
          <Button htmlType='submit'>Add</Button>
          <Collapse ghost defaultActiveKey={['1']} onChange={onChange}>
            <Panel header='This is panel header 1' key='1'>
              <p>{text}</p>
            </Panel>
            <Panel header='This is panel header 2' key='2'>
              <p>{text}</p>
            </Panel>
            <Panel header='This is panel header 3' key='3'>
              <p>{text}</p>
            </Panel>
          </Collapse>
        </Form>
      </Modal>
    </div>
  )
}

export default CompanyAddition