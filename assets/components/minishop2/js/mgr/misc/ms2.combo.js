Ext.namespace('miniShop2.combo');

miniShop2.combo.User = function(config) {
	config = config || {};
	Ext.applyIf(config,{
		name: 'user'
		,fieldLabel: _('ms2_product_' + config.name || 'createdby')
		,hiddenName: config.name || 'createdby'
		,displayField: 'username'
		,valueField: 'id'
		,anchor: '99%'
		,fields: ['username','id']
		,pageSize: 20
		,url: MODx.config.connectors_url + 'security/user.php'
		,typeAhead: true
		,editable: true
		,action: 'getList'
		,allowBlank: true
		,baseParams: {
			action: 'getlist'
			,combo: 1
			,id: config.value
			//,limit: 0
		}
	});
	miniShop2.combo.User.superclass.constructor.call(this,config);
};
Ext.extend(miniShop2.combo.User,MODx.combo.ComboBox);
Ext.reg('minishop2-combo-user',miniShop2.combo.User);


miniShop2.combo.Category = function(config) {
	config = config || {};
	Ext.applyIf(config,{
		id: 'tickets-combo-section'
		,fieldLabel: _('ms2_product_parent')
		,description: '<b>[[*parent]]</b><br />'+_('ms2_ms2_product_parent_help')
		,fields: ['id','pagetitle','parents']
		,valueField: 'id'
		,displayField: 'pagetitle'
		,name: 'parent-cmb'
		,hiddenName: 'parent-cmp'
		,allowBlank: false
		,url: miniShop2.config.connector_url
		,baseParams: {
			action: 'mgr/category/getcats'
			,combo: 1
			,id: config.value
			//,limit: 0
		}
		,tpl: new Ext.XTemplate(''
		+'<tpl for="."><div class="minishop2-category-list-item">'
			+'<tpl if="parents">'
					+'<span class="parents">'
						+'<tpl for="parents">'
							+'<nobr>{pagetitle} / </nobr>'
						+'</tpl>'
					+'</span>'
			+'</tpl>'
			+'<h3 class="">{pagetitle}</h3>'
			+'</div></tpl>',{
			compiled: true
		})
		,itemSelector: 'div.minishop2-category-list-item'
		,pageSize: 20
		,typeAhead: true
		,editable: true
	});
	miniShop2.combo.Category.superclass.constructor.call(this,config);
};
Ext.extend(miniShop2.combo.Category,MODx.combo.ComboBox);
Ext.reg('minishop2-combo-category',miniShop2.combo.Category);


miniShop2.combo.DateTime = function(config) {
	config = config || {};
	Ext.applyIf(config,{
		timePosition:'right'
		,allowBlank: true
		,hiddenFormat:'Y-m-d H:i:s'
		,dateFormat: MODx.config.manager_date_format
		,timeFormat: MODx.config.manager_time_format
		,dateWidth: 120
		,timeWidth: 120
	});
	miniShop2.combo.DateTime.superclass.constructor.call(this,config);
};
Ext.extend(miniShop2.combo.DateTime,Ext.ux.form.DateTime);
Ext.reg('minishop2-xdatetime',miniShop2.combo.DateTime);


miniShop2.combo.Autocomplete = function(config) {
	config = config || {};

	Ext.applyIf(config,{
		name: config.name
		,fieldLabel: _('ms2_product_' + config.name)
		,id: 'minishop2-product-' + config.name
		,hiddenName: config.name
		,displayField: config.name
		,valueField: config.name
		,anchor: '99%'
		,fields: [config.name]
		//,pageSize: 20
		,forceSelection: false
		,url: miniShop2.config.connector_url
		,typeAhead: true
		,editable: true
		,allowBlank: true
		,baseParams: {
			action: 'mgr/product/autocomplete'
			,name: config.name
			,combo:1
			,limit: 0
		}
		,hideTrigger: true
	});
	miniShop2.combo.Autocomplete.superclass.constructor.call(this,config);
};
Ext.extend(miniShop2.combo.Autocomplete,MODx.combo.ComboBox);
Ext.reg('minishop2-combo-autocomplete',miniShop2.combo.Autocomplete);


miniShop2.combo.Vendor = function(config) {
	config = config || {};

	Ext.applyIf(config,{
		name: config.name || 'vendor'
		,fieldLabel: _('ms2_product_' + config.name || 'vendor')
		,hiddenName: config.name || 'vendor'
		,displayField: 'name'
		,valueField: 'id'
		,anchor: '99%'
		,fields: ['name','id']
		,pageSize: 20
		,url: miniShop2.config.connector_url
		,typeAhead: true
		,editable: true
		,allowBlank: true
		,emptyText: _('no')
		,baseParams: {
			action: 'mgr/settings/vendor/getlist'
			,combo: 1
			,id: config.value
			//,limit: 0
		}
	});
	miniShop2.combo.Vendor.superclass.constructor.call(this,config);
};
Ext.extend(miniShop2.combo.Vendor,MODx.combo.ComboBox);
Ext.reg('minishop2-combo-vendor',miniShop2.combo.Vendor);


miniShop2.combo.Source = function(config) {
	config = config || {};

	Ext.applyIf(config,{
		name: config.name || 'source-cmb'
		,id: 'minishop2-product-source'
		,hiddenName: 'source-cmb'
		,displayField: 'name'
		,valueField: 'id'
		,width: 300
		,listWidth: 300
		,fieldLabel: _('ms2_product_' + config.name || 'source')
		,anchor: '99%'
		,allowBlank: false
	});
	miniShop2.combo.Source.superclass.constructor.call(this,config);
};
Ext.extend(miniShop2.combo.Source,MODx.combo.MediaSource);
Ext.reg('minishop2-combo-source',miniShop2.combo.Source);


miniShop2.combo.Options = function(config) {
	config = config || {};
	Ext.applyIf(config,{
		xtype:'superboxselect'
		,allowBlank: true
		,msgTarget: 'under'
		,allowAddNewData: true
		,addNewDataOnBlur : true
		,resizable: true
		,name: config.name || 'tags'
		,anchor:'100%'
		,minChars: 2
		,store:new Ext.data.JsonStore({
			id: (config.name || 'tags') + '-store'
			,root:'results'
			,autoLoad: true
			,autoSave: false
			,totalProperty:'total'
			,fields:['value']
			,url: miniShop2.config.connector_url
			,baseParams: {
				action: 'mgr/product/getoptions'
				,key: config.name
			}
		})
		,mode: 'remote'
		,displayField: 'value'
		,valueField: 'value'
		,triggerAction: 'all'
		,extraItemCls: 'x-tag'
		,listeners: {
			newitem: function(bs,v, f){
				var newObj = {
					tag: v
				};
				bs.addItem(newObj);
			}
		}
	});
	config.name += '[]';
	miniShop2.combo.Options.superclass.constructor.call(this,config);
};
Ext.extend(miniShop2.combo.Options,Ext.ux.form.SuperBoxSelect);
Ext.reg('minishop2-combo-options',miniShop2.combo.Options);


miniShop2.combo.Chunk = function(config) {
	config = config || {};
	Ext.applyIf(config,{
		name: 'chunk'
		,hiddenName: 'chunk'
		,displayField: 'name'
		,valueField: 'id'
		,editable: true
		,fields: ['id','name']
		,pageSize: 20
		,emptyText: _('ms2_combo_select')
		,hideMode: 'offsets'
		,url: miniShop2.config.connector_url
		,baseParams: {
			action: 'mgr/system/element/chunk/getlist'
			,mode: 'chunks'
		}
	});
	miniShop2.combo.Chunk.superclass.constructor.call(this,config);
};
Ext.extend(miniShop2.combo.Chunk,MODx.combo.ComboBox);
Ext.reg('minishop2-combo-chunk',miniShop2.combo.Chunk);


miniShop2.combo.Browser = function(config) {
	config = config || {};

	if (config.length != 0 && typeof config.openTo !== "undefined") {
		if (!/^\//.test(config.openTo)) {
			config.openTo = '/' + config.openTo;
		}
		if (!/$\//.test(config.openTo)) {
			var tmp = config.openTo.split('/')
			delete tmp[tmp.length - 1];
			tmp = tmp.join('/');
			config.openTo = tmp.substr(1)
		}
	}

	Ext.applyIf(config,{
		width: 300
		,triggerAction: 'all'
	});
	miniShop2.combo.Browser.superclass.constructor.call(this,config);
	this.config = config;
};
Ext.extend(miniShop2.combo.Browser,Ext.form.TriggerField,{
	browser: null

	,onTriggerClick : function(btn){
		if (this.disabled){
			return false;
		}

		if (this.browser === null) {
			this.browser = MODx.load({
				xtype: 'modx-browser'
				,id: Ext.id()
				,multiple: true
				,source: this.config.source || MODx.config.default_media_source
				,rootVisible: this.config.rootVisible || false
				,allowedFileTypes: this.config.allowedFileTypes || ''
				,wctx: this.config.wctx || 'web'
				,openTo: this.config.openTo || ''
				,rootId: this.config.rootId || '/'
				,hideSourceCombo: this.config.hideSourceCombo || false
				,hideFiles: this.config.hideFiles || true
				,listeners: {
					'select': {fn: function(data) {
						this.setValue(data.fullRelativeUrl);
						this.fireEvent('select',data);
					},scope:this}
				}
			});
		}
		this.browser.win.buttons[0].on('disable',function(e) {this.enable()})
		this.browser.win.tree.on('click', function(n,e) {
				path = this.getPath(n);
				this.setValue(path);
			},this
		)
		this.browser.win.tree.on('dblclick', function(n,e) {
				path = this.getPath(n);
				this.setValue(path);
				this.browser.hide()
			},this
		)
		this.browser.show(btn)
		return true;
	}
	,onDestroy: function(){
		miniShop2.combo.Browser.superclass.onDestroy.call(this);
	}
	,getPath: function(n) {
		if (n.id == '/') {return '';}
		data = n.attributes;
		path = data.path + '/'

		return path;
	}
});
Ext.reg('minishop2-combo-browser',miniShop2.combo.Browser);