let myLeads = []
const inputEl = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
   myLeads = leadsFromLocalStorage
   render(myLeads)
}

tabBtn.addEventListener("click", function(){
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      console.log("Tabs found:", tabs) // Debug log
      if(tabs && tabs[0] && tabs[0].url) {
         myLeads.push(tabs[0].url)
         localStorage.setItem("myLeads", JSON.stringify(myLeads))
         render(myLeads)
      } else {
         console.error("No valid tab found or URL is undefined")
      }
   })
})

function render(leads){
   let listItems = ""
   for(let i = 0; i < leads.length; i++){
      listItems += `<li>
         <a target='_blank' href='${leads[i]}'>
         ${leads[i]}
         </a>
      </li>`
   }
   ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function(){
   localStorage.clear()
   myLeads = []
   render(myLeads)
})

inputbtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})
