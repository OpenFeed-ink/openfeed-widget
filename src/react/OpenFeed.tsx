"use client"
import { useEffect, useRef } from "react"
import { mount } from "../mount"

type Props = {
  projectId: string
  apiUrl?: string
  prod?: string
}

export const OpenFeed = ({ projectId, apiUrl, prod }: Props) => {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return 
    mounted.current = true
    mount({ projectId, apiUrl, prod })

    return () => {
      const host = document.getElementById("openfeed-widget-host")
      if (host) host.remove()
      mounted.current = false
    }
  }, [])

  return null
}
