function setup(){

const sideNavItem = selectAll('.side-nav-item');
for (let i=0; i<sideNavItem.length; i++){
    sideNavItem[i].mousePressed(onMousePressed);
    sideNavItem[i].mouseOver(onMouseOver);
    sideNavItem[i].mouseOut(onMouseOut);
}
}

function onMousePressed(){
const id = this.elt.dataset.id;
const className = "." + id;
const projects = selectAll('.project');
for (let i=0 ; i< projects.length; i++){
projects[i].hide();
}
const selectedProject = select(className);
selectedProject.show();
}

function onMouseOver(){
this.style("color","red");
}

function onMouseOut(){
this.style("color","Black");
}

