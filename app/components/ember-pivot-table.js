// import EmberUploader from 'ember-uploader';

export default Ember.Component.extend({
	theadArray:[],
	tbodyArray:[],
	spanSize :function(arr, i, j) {
        var l, len, n, noDraw, ref, ref1, stop, x;
        if (i !== 0) {
          noDraw = true;
          for (x = l = 0, ref = j; 0 <= ref ? l <= ref : l >= ref; x = 0 <= ref ? ++l : --l) {
            if (arr[i - 1][x] !== arr[i][x]) {
              noDraw = false;
            }
          }
          if (noDraw) {
            return -1;
          }
        }
        len = 0;
        while (i + len < arr.length) {
          stop = false;
          for (x = n = 0, ref1 = j; 0 <= ref1 ? n <= ref1 : n >= ref1; x = 0 <= ref1 ? ++n : --n) {
            if (arr[i][x] !== arr[i + len][x]) {
              stop = true;
            }
          }
          if (stop) {
            break;
          }
          len++;
        }
        return len;
      },
	didInsertElement(){
		this._super(...arguments);
		let self=this;
		var colAttrs= ["day", "time", "size"];
		var rowAttrs=["sex", "smoker"];
		var rowKeys=[["Male", "No"],["Male", "Yes"],["Female", "No"],["Female", "Yes"]];
		var colKeys=[["Fri","Dinner",2],["Fri","Dinner",4],["Fri","Lunch",1],["Fri","Lunch",2],["Fri","Lunch",3],["Sat","Dinner",1],["Sat","Dinner",2],["Sat","Dinner",3],["Sat","Dinner",4],["Sat","Dinner",5],["Sun","Dinner",2],["Sun","Dinner",3],["Sun","Dinner",4],["Sun","Dinner",5],["Sun","Dinner",6],["Thur","Dinner",2],["Thur","Lunch",1],["Thur","Lunch",2],["Thur","Lunch",3],["Thur","Lunch",4],["Thur","Lunch",5],["Thur","Lunch",6]];
		var pivotData=[
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
			[0.0, 0.33, 0.66, 0.99, 1.32, 1.6500000000000001, 1.98, 2.31, 2.64, 2.97, 3.3000000000000003, 3.6300000000000003, 3.96, 4.29, 4.62, 4.95, 5.28, 5.61, 5.94, 6.2700000000000005, 6.6000000000000005, 6.930000000000001],
			[22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
			[11.0, 10.5, 10.0, 9.5, 9.0, 8.5, 8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.5]
		];
			var aggregator, c, colAttrs, colKey, colKeys, defaults, getClickHandler, i, j, r, result, rowAttrs, rowKey, rowKeys, tbody, td, th, thead, totalAggregator, tr, txt, val, x;
      result=this.$('table')[0];
      result.className = "pvtTable";
      thead=Ember.A([]);
      for (let j=0;j<colAttrs.length;j++) {
        c = colAttrs[j];
        tr=Ember.A([]);
        th={};
        if (parseInt(j) === 0 && rowAttrs.length !== 0) {
          th['colspan']=rowAttrs.length
          th['rowspan']=colAttrs.length;
          tr.pushObject(th);
        }
        th={};
        th['className']="pvtAxisLabel";
        th['textContent']=c;
        tr.pushObject(th);
        for (let i=0;i<colKeys.length;i++) {
          colKey = colKeys[i];
          x = self.spanSize(colKeys, parseInt(i), parseInt(j));
          if (x !== -1) {
          	th={};
            th['className']='pvtColLabel';
            th['textContent']=colKey[j];
            th['colspan']=x;
            if (parseInt(j) === colAttrs.length - 1 && rowAttrs.length !== 0) {
              th['rowspan']=2;
            }
            tr.pushObject(th);
          }
        }
        thead.pushObject(tr);
      }
      if (rowAttrs.length !== 0) {
        tr=Ember.A([]);
        for (let i=0;i<rowAttrs.length;i++) {
          r = rowAttrs[i];
          th={};
          th['className']='pvtAxisLabel';
          th['textContent']=r;
          tr.pushObject(th);
        }
        th={};
        tr.pushObject(th);
        thead.pushObject(tr);
      }
      tbody=Ember.A([]);
      for (let i=0;i<rowKeys.length;i++) {
        rowKey = rowKeys[i];
        tr=Ember.A([]);
        for (let j=0;j<rowKey.length;j++) {
          txt = rowKey[j];
          x = self.spanSize(rowKeys, parseInt(i), parseInt(j));
          if (x !== -1) {
            th={};
            th['className']='pvtRowLabel testintesting';
            th['textContent']=txt;
            th['rowspan']=x;
            if (parseInt(j) === rowAttrs.length - 1 && colAttrs.length !== 0) {
              th['colspan']=2;
            }
            tr.pushObject(th);
          }
        }
        for (let j=0;j<colKeys.length;j++) {
			colKey = colKeys[j];
			val =pivotData[i][j];
			td={};
			td['className']="pvtVal row" + i + " col" + j;
			td['textContent']=val;
			td['data-value']=val;
			td['i']=i;
			td['j']=j;
    		tr.pushObject(td);
        }
        tbody.pushObject(tr);
      }
      self.set('theadArray',thead);
      self.set('tbodyArray',tbody);
	},
	actions:{
		clickCallBack(input1,input2){
			var colAttrs= ["day", "time", "size"];
		var rowAttrs=["sex", "smoker"];
		var rowKeys=[["Male", "No"],["Male", "Yes"],["Female", "No"],["Female", "Yes"]];
		var colKeys=[["Fri","Dinner",2],["Fri","Dinner",4],["Fri","Lunch",1],["Fri","Lunch",2],["Fri","Lunch",3],["Sat","Dinner",1],["Sat","Dinner",2],["Sat","Dinner",3],["Sat","Dinner",4],["Sat","Dinner",5],["Sun","Dinner",2],["Sun","Dinner",3],["Sun","Dinner",4],["Sun","Dinner",5],["Sun","Dinner",6],["Thur","Dinner",2],["Thur","Lunch",1],["Thur","Lunch",2],["Thur","Lunch",3],["Thur","Lunch",4],["Thur","Lunch",5],["Thur","Lunch",6]];
		var pivotData=[
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
			[0.0, 0.33, 0.66, 0.99, 1.32, 1.6500000000000001, 1.98, 2.31, 2.64, 2.97, 3.3000000000000003, 3.6300000000000003, 3.96, 4.29, 4.62, 4.95, 5.28, 5.61, 5.94, 6.2700000000000005, 6.6000000000000005, 6.930000000000001],
			[22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
			[11.0, 10.5, 10.0, 9.5, 9.0, 8.5, 8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.5]
		];
			let rowJSON={};
			for(var i=0;i<rowAttrs.length;i++){
				rowJSON[rowAttrs[i]]=rowKeys[input1][i];
			}
			for(var i=0;i<colAttrs.length;i++){
				rowJSON[colAttrs[i]]=colKeys[input2][i];
			}
			console.log(rowJSON);
		}
	}
})
