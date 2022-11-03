import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
 
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'home',
    url: 'dashboard'
  },
  {
    id: 'phone-account',
    title: 'Phone Account',
    type: 'item',
    icon: 'smartphone',
    url: 'phone-account'
  },
  {
    id: 'pbx-log',
    title: 'Phone Log',
    type: 'item',
    icon: 'file-text',
    url:'sip-campaign'
  },
  {
    id: 'pbx-campaign',
    title: 'Campaign',
    type: 'item',
    icon: 'navigation',
    url:'sip-campaign'
  },
  {
    id: 'user',
    title: 'User',
    type: 'item',
    icon: 'user',
    url: 'user-manager'
  },
{
  id: 'setting',
  title: 'Setting',
  type: 'collapsible',
  icon: 'settings',
  children:[
    {
      id:'asterisk-config',
      title: 'Asterisk',
      // translate: "MENU.List_Plan",
      icon: "circle",
      type:'item',
      url: "asterisk-config",
    },
    {
      id:'server-config',
      title: 'Server',
      type:'item',
      // translate: "List Outgoing",
      icon: "circle",
      url: "server-config",
    },
     {
      id:'avr',
      title: 'AVR',
      type:'item',
      // translate: "List Outgoing",
      icon: "circle",
      url: "avr",
    },
  ]
}

]
