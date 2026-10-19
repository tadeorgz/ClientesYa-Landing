import { ArrowRight, ArrowUpRight, Check, ExternalLink, Info, LayoutTemplate, Mail, Menu, MessageCircle, Plus, Send, ShoppingBag, User, Utensils, QrCode } from 'lucide-react'

const icons = { 'arrow-right': ArrowRight, 'arrow-up-right': ArrowUpRight, check: Check, 'external-link': ExternalLink, info: Info, 'layout-template': LayoutTemplate, mail: Mail, menu: Menu, 'message-circle': MessageCircle, plus: Plus, send: Send, 'shopping-bag': ShoppingBag, user: User, utensils: Utensils, 'qr-code': QrCode }
export default function DraftIcon({ name, width = 20, className = '' }) {
  const Icon = icons[name.replace('lucide:', '')] || ArrowUpRight
  return <Icon size={Number(width)} className={`inline-block shrink-0 ${className}`} aria-hidden="true" />
}
