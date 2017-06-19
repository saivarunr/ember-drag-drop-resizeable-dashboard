import Ember from 'ember';

export default Ember.Component.extend({
	useSwap: true,
  sortFinishText: null,
  sortableObjectList: Ember.A([]),
  gridSteps:0,
  // sortableObjectListSS:Ember.A([]),
  DOMPrefix:"sortobject-",
  init(){
    this._super(...arguments);
    
    // this.notifyPropertyChange('sortableObjectList');
    // this.set('sortableObjectListSS',this.get('sortableObjectList'));
    // this.setStyles(); 
  },
  didReceiveAttrs(){
  	this._super(...arguments);
  	for(let i=0;i<18;i++){
      // this.get('sortableObjectListSS').pushObject({"id":i});
      if(i%2==0){
        this.get('sortableObjectList').pushObject({"id":i,"component":"another-component","style":{"width":"300px","height":"200px"}});  
      }
      else{
        this.get('sortableObjectList').pushObject({"id":i,"component":"varun-component","style":{"width":"300px","height":"200px"}});  
      }
    }
    
  },
  onResizeStop(event,id){
    // console.log('id',id);
  	let DOMPrefix=this.get('DOMPrefix');
  	let DOMObjectID="#"+DOMPrefix+id;
  	let DOMObject=this.$(DOMObjectID);
    let self=this;
    let index=this.get('sortableObjectList').indexOf(this.get('sortableObjectList').findBy('id',id));

    // self.get('sortableObjectList').forEach(function(sortObject){
    //   if(sortObject.id==id){

    //   }
    // })
  	this.set(`sortableObjectList.${index}.style.width`,DOMObject.css("width"));
  	this.set(`sortableObjectList.${index}.style.height`,DOMObject.css("height"));
  },
  didRender(){
  	this._super(...arguments);
  	// this.$(".sortObject").unbind('resizable');
  	// this.$(".sortObject").resizable();
  	let self=this;
  	let DOMPrefix=this.get('DOMPrefix');
  	let gridSteps=this.get('gridSteps');
  	self.get('sortableObjectList').forEach(function(sortObject){
  		let DOMObjectID="#"+DOMPrefix+sortObject.id;
  		let DOMObject=self.$(DOMObjectID);
  		DOMObject.resizable({
  			grid:gridSteps,
  			stop:function(event){
  				self.onResizeStop(event,sortObject.id);
  			}
  		});
  	});
  },
  setStyles(){
    let self=this;
    let DOMPrefix=this.get('DOMPrefix');
    self.get('sortableObjectList').forEach(function(sortableObject){
      let DOMObject=document.getElementById(DOMPrefix+sortableObject.id);
      if(DOMObject==null){

        // console.log("Didn't get element yet");
      }
      else{
        DOMObject.style.width=sortableObject.style.width;
        DOMObject.style.height=sortableObject.style.height;  
      }
      
    });
  },
  actions: {
    sortEndAction: function() {
      console.log('Sort Ended', this.get('sortableObjectList'));
    },
    resize: function(input1,input2){
      let DOMObject=document.getElementById(input1);
      console.log('DOMObject',input1,input2);

      // console.log('resizing started',input1,input2);
    }
  }
});
