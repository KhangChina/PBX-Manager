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
    id: 'phone-log',
    title: 'Phone Log',
    type: 'item',
    icon: 'file-text',
    url:'phone-log'
  },
  {
    id: 'pbx-context',
    title: 'Context',
    type: 'item',
    icon: 'navigation',
    url:'pbx-context'
  },
  {
    id: 'user',
    title: 'User',
    type: 'item',
    icon: 'user',
    url: 'user-manager',
    disabled:true
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
      disabled:true,
    },
    {
      id:'server-config',
      title: 'Server',
      type:'item',
      // translate: "List Outgoing",
      icon: "circle",
      url: "server-config",
      disabled:true,
    },
     {
      id:'avr',
      title: 'AVR',
      type:'item',
      // translate: "List Outgoing",
      icon: "circle",
      url: "avr",
      disabled:true,
    },
  ]
}

]
