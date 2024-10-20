(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{9441:function(e,a,t){Promise.resolve().then(t.bind(t,7340))},7340:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return g}});var s=t(7437),i=t(3145),l=t(2265),n=t(4826),r=t(429),o=t(5095),c=t(1469);let d=(0,l.memo)(e=>{let{pair:a,onRemove:t}=e;return(0,s.jsxs)(r.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},className:"bg-gray-100 p-4 rounded-xl relative",children:[(0,s.jsx)("button",{onClick:()=>t(a.id),className:"absolute top-2 right-2 text-gray-500 hover:text-red-500 z-10",children:(0,s.jsx)(c.q5L,{size:20})}),(0,s.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"text-lg font-semibold mb-2 text-indigo-900",children:"Original"}),(0,s.jsx)("div",{className:"relative w-full pt-[100%]",children:(0,s.jsx)(i.default,{src:URL.createObjectURL(a.original),alt:"Original",fill:!0,className:"absolute inset-0 object-contain rounded-lg"})})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"text-lg font-semibold mb-2 text-indigo-900",children:"Processed"}),a.processed?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"relative w-full pt-[100%]",children:(0,s.jsx)(i.default,{src:a.processed,alt:"Processed",fill:!0,className:"absolute inset-0 object-contain rounded-lg"})}),(0,s.jsxs)("a",{href:a.processed,download:"processed_".concat(a.original.name),className:"mt-2 inline-flex items-center text-indigo-600 hover:text-indigo-800",children:[(0,s.jsx)(c._hL,{className:"mr-1"}),"Download"]})]}):(0,s.jsx)("div",{className:"w-full pt-[100%] relative bg-gray-200 rounded-lg",children:(0,s.jsx)("div",{className:"absolute inset-0 flex items-center justify-center text-gray-400",children:"Not processed yet"})})]})]})]})});d.displayName="ImagePairComponent";let m=(0,l.memo)(e=>{let{isDragging:a,onDragEnter:t,onDragLeave:i,onDragOver:l,onDrop:n,fileInputRef:r,onFileChange:o}=e;return(0,s.jsxs)("div",{className:"relative border-2 border-dashed ".concat(a?"border-indigo-500 bg-indigo-100":"border-indigo-300"," rounded-xl p-8 transition-colors duration-200"),onDragEnter:t,onDragLeave:i,onDragOver:l,onDrop:n,children:[(0,s.jsx)("input",{type:"file",accept:"image/*",onChange:o,className:"hidden",id:"imageUpload",multiple:!0,ref:r}),(0,s.jsxs)("label",{htmlFor:"imageUpload",className:"flex flex-col items-center cursor-pointer z-10 relative",children:[(0,s.jsx)(c.Yjd,{className:"text-4xl text-indigo-500 mb-4"}),(0,s.jsx)("span",{className:"text-indigo-900 text-center",children:"Drag & Drop or Click to Upload Multiple Images"})]}),a&&(0,s.jsx)("div",{className:"absolute inset-0 bg-indigo-100 bg-opacity-90 flex items-center justify-center",children:(0,s.jsx)("span",{className:"text-indigo-900 font-semibold",children:"Drop images here"})})]})});function g(){let[e,a]=(0,l.useState)([]),[t,i]=(0,l.useState)(!1),[g,x]=(0,l.useState)(85),[u,p]=(0,l.useState)(!1),[h,f]=(0,l.useState)(!1),b=(0,l.useRef)(null);(0,l.useEffect)(()=>{async function e(){try{let e=document.createElement("canvas");e.width=1,e.height=1;let a=e.getContext("2d");a&&(a.fillStyle="rgba(0, 0, 0, 0)",a.fillRect(0,0,1,1));let t=await new Promise(a=>e.toBlob(e=>a(e),"image/png"));await (0,n.X1)(t),f(!0)}catch(a){console.error("Error checking model readiness:",a),setTimeout(e,1e3)}}e()},[]);let j=(0,l.useCallback)(t=>{t&&(!(e.length>0)||window.confirm("Uploading new images will clear all existing images. Do you want to continue?"))&&a(Array.from(t).map(e=>({id:Math.random().toString(36).substr(2,9),original:e,processed:null})))},[e.length]),v=(0,l.useCallback)(e=>{e.preventDefault(),e.stopPropagation(),p(!0)},[]),N=(0,l.useCallback)(e=>{e.preventDefault(),e.stopPropagation(),p(!1)},[]),y=(0,l.useCallback)(e=>{e.preventDefault(),e.stopPropagation()},[]),w=(0,l.useCallback)(e=>{e.preventDefault(),e.stopPropagation(),p(!1),j(e.dataTransfer.files)},[j]),k=(0,l.useCallback)(async()=>{if(0!==e.length&&h){i(!0);try{let t=await Promise.all(e.map(async e=>{if(e.processed)return e;let a=await (0,n.X1)(e.original,{output:{quality:g/100}}),t=URL.createObjectURL(a);return{...e,processed:t}}));a(t)}catch(e){console.error("Error removing background:",e)}finally{i(!1)}}},[e,g,h]),C=(0,l.useCallback)(e=>{a(a=>a.filter(a=>a.id!==e))},[]),D=(0,l.useCallback)(e=>{x(Number(e.target.value))},[]),E=(0,l.useMemo)(()=>(0,s.jsx)(o.M,{children:e.map(e=>(0,s.jsx)(d,{pair:e,onRemove:C},e.id))}),[e,C]),P=(0,l.useCallback)(e=>{j(e.target.files)},[j]);return(0,s.jsx)("div",{className:"min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-8",children:(0,s.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,s.jsx)("h1",{className:"text-5xl font-extrabold mb-8 text-center text-indigo-900",children:"Background Removal Tool"}),(0,s.jsx)("div",{className:"bg-white rounded-3xl shadow-2xl p-8",children:(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[(0,s.jsxs)(r.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"space-y-6 lg:col-span-1",children:[(0,s.jsx)("h2",{className:"text-2xl font-semibold mb-4 text-indigo-900",children:"Upload Images"}),(0,s.jsx)(m,{isDragging:u,onDragEnter:v,onDragLeave:N,onDragOver:y,onDrop:w,fileInputRef:b,onFileChange:P}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,s.jsx)("label",{className:"text-sm font-medium text-indigo-900",children:"Quality"}),(0,s.jsxs)("span",{className:"text-sm font-semibold text-indigo-600",children:[g,"%"]})]}),(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)(c.NNy,{className:"text-indigo-500 mr-2"}),(0,s.jsx)("input",{type:"range",min:"1",max:"100",value:g,onChange:D,className:"w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"})]})]}),(0,s.jsx)("button",{onClick:k,disabled:0===e.length||t||!h,className:"w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center",children:t?(0,s.jsxs)("span",{className:"flex items-center",children:[(0,s.jsxs)("svg",{className:"animate-spin -ml-1 mr-3 h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,s.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,s.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Processing..."]}):h?(0,s.jsx)("span",{children:"Remove Background"}):(0,s.jsx)("span",{children:"Loading model..."})})]}),(0,s.jsx)("div",{className:"lg:col-span-2 space-y-6",children:E})]})})]})})}m.displayName="UploadArea"}},function(e){e.O(0,[974,154,659,502,581,971,117,744],function(){return e(e.s=9441)}),_N_E=e.O()}]);