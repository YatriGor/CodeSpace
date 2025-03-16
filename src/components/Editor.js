import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

// Importing SVG icons
import htmlIcon from '../assets/html.svg'
import cssIcon from '../assets/css.svg'
import jsIcon from '../assets/js.svg'

export default function Editor(props) {
  const {
    language,
    displayName,
    value,
    onChange
  } = props

  const [open, setOpen] = useState(true)

  // Determine the correct icon based on language
  const getIcon = (language) => {
    switch (language) {
      case 'xml': return htmlIcon
      case 'css': return cssIcon
      case 'javascript': return jsIcon
      default: return null
    }
  }

  function handleChange(editor, data, value) {
    onChange(value)
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title">
        <img 
          src={getIcon(language)} 
          alt={`${displayName} Icon`} 
          className="editor-icon"
        />
        {displayName}
        <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true
        }}
      />
    </div>
  )
}
