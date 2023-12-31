/* eslint-disable max-len */
import { Button, Card, ConfigProvider, Form, Input, Select, message }   from 'antd'
import React                                                            from 'react'
import { getCurrentDate, post }                                         from '../../Plugins/helpers'
import SuccessMessage                                                   from '../../components/ChhecklistBody/SuccessMessage'
import { useNavigate }                                                  from 'react-router-dom'
import { useAppSelector }                                               from '../../store/hooks'
import { useCookies }                                                   from 'react-cookie'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

type FormValuesType = {
    username:     string,
    email:        string,
    userRole:     string,
    passwordOne:  string,
    passwordTwo:  string,
    status:       string,
    dateCreated:  string,
    defaultTheme: boolean,
}

const CreateUserPage = () => {
  const [form] =                            Form.useForm()
  const [messageApi, contextHolder] =       message.useMessage()
  const [cookies] =                         useCookies(['access_token'])
  const navigate =                          useNavigate()
  const [loginError, setLoginError] =       React.useState(false)
  const [errorMessage, setErrorMessage] =   React.useState('')
  const defaultTheme =                      useAppSelector((state) => state.theme.value)

  const onFinish = async (values: FormValuesType) => {
    try{
      values.status = 'active'
      values.dateCreated = getCurrentDate()
      values.defaultTheme = false
      const res = await post('createUser', values, cookies.access_token)
      if (!res.error) {
        messageApi.success({
          type:    'success',
          content: 'Išsaugota',
        })
        form.resetFields()
        setLoginError(false)
        setErrorMessage('')
        setTimeout(() => {
          navigate('/ManageUsers')
        },1000)
      }else{
        setLoginError(res.error)
        setErrorMessage(res.message)
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='CreateUserPageContainer'>
      <ConfigProvider theme = {{
        token: {
          colorBgContainer:     defaultTheme ? '#1e1e1e' : 'white',
          colorText:            defaultTheme ? 'white': 'black',
          colorTextPlaceholder: '#7d7d7d',
        },
      }}>

        <Card
          headStyle={{textAlign: 'center', backgroundColor: defaultTheme? '#191919': 'white', color: defaultTheme? 'white':'black'}}
          title='Create User'
          bordered={true}
          className='CreateUserCard'>
          <Form
            {...formItemLayout}
            form={form}
            name='createUser'
            onFinish={onFinish}
            className='Form'
            scrollToFirstError
          >
            <Form.Item
              labelAlign='left'
              name='username'
              label='User Name'
              rules={[{ required: true, message: 'Please input users name!', whitespace: true }]}
            >
              <Input placeholder='Darbuotojo vardas'/>
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='email'
              label='E-mail'
              rules={[
                {
                  type:    'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message:  'Please input your E-mail!',
                },
              ]}
            >
              <Input placeholder='Darbuotojo el. paštas'/>
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='userRole'
              label='User Role'
              rules={[
                {
                  required: true,
                  message:  'Please select a role!',
                },
              ]}
            >
              <Select
                dropdownStyle={{ backgroundColor: defaultTheme ? '#191919' : 'white' }}
                placeholder='Pasirinkti rolę'
                options={[
                  { value: 'systemAdmin', label: 'System Admin' },
                  { value: 'admin', label: 'Admin' },
                  { value: 'user', label: 'User' },
                ]}
              />
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='passwordOne'
              label='Password'
              rules={[
                {
                  required: true,
                  message:  'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder='Slaptažodis' />
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='passwordTwo'
              label='Confirm Password'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message:  'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('passwordOne') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'))
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Pakartoti slaptažodį'/>
            </Form.Item>
            <Button htmlType='submit'>
            Create User
            </Button>
            {loginError && <div style={{color: 'red', textAlign: 'center'}}>{errorMessage}</div>}
          </Form>
        </Card>
      </ConfigProvider>
      <SuccessMessage contextHolder={contextHolder} />
    </div>
  )
}

export default CreateUserPage