<?php
class msProductCreateManagerController extends ResourceCreateManagerController {
	/* @var msProduct $resource */
	public $resource;


	/**
	 * Returns language topics
	 * @return array
	 */
	public function getLanguageTopics() {
		return array('resource','minishop2:default','minishop2:product');
	}


	/**
	 * Check for any permissions or requirements to load page
	 * @return bool
	 */
	public function checkPermissions() {
		return $this->modx->hasPermission('msproduct_save');
	}


	/**
	 * Register custom CSS/JS for the page
	 * @return void
	 */
	public function loadCustomCssJs() {
		$mgrUrl = $this->modx->getOption('manager_url',null,MODX_MANAGER_URL);

		$minishopAssetsUrl = $this->modx->getOption('minishop2.assets_url',null,$this->modx->getOption('assets_url',null,MODX_ASSETS_URL).'components/minishop2/');
		$connectorUrl = $minishopAssetsUrl.'connector.php';
		$minishopJsUrl = $minishopAssetsUrl.'js/mgr/';
		$minishopCssUrl = $minishopAssetsUrl.'css/mgr/';

		$product_fields = array_merge($this->resource->getFieldsNames(), array('syncsite'));

		if (!$product_main_fields = $this->modx->getOption('ms2_product_main_fields')) {
			$product_main_fields = 'pagetitle,longtitle,introtext,content,publishedon,pub_date,unpub_date,template,parent,alias,menutitle,searchable,cacheable,richtext,uri_override,uri,hidemenu,show_in_tree';
		}
		$product_main_fields = array_map('trim', explode(',',$product_main_fields));
		$product_main_fields = array_values(array_intersect($product_main_fields, $product_fields));

		$this->addCss($minishopCssUrl. 'bootstrap.min.css');
		$this->addJavascript($mgrUrl.'assets/modext/util/datetime.js');
		$this->addJavascript($mgrUrl.'assets/modext/widgets/element/modx.panel.tv.renders.js');
		$this->addJavascript($mgrUrl.'assets/modext/widgets/resource/modx.grid.resource.security.local.js');
		$this->addJavascript($minishopJsUrl.'product/product.tv.js');
		$this->addJavascript($mgrUrl.'assets/modext/widgets/resource/modx.panel.resource.js');
		$this->addJavascript($mgrUrl.'assets/modext/sections/resource/create.js');
		$this->addJavascript($minishopJsUrl.'minishop2.js');
		$this->addJavascript($minishopJsUrl.'misc/ms2.combo.js');
		$this->addJavascript($minishopJsUrl.'misc/ms2.utils.js');
		$this->addLastJavascript($minishopJsUrl.'product/product.common.js');
		$this->addLastJavascript($minishopJsUrl.'product/create.js');

		$this->resourceArray['show_in_tree'] = $this->context->getOption('ms2_product_show_in_tree_default', 0, $this->modx->_userConfig);
		$this->resourceArray['show_in_tree'] = isset($this->resourceArray['show_in_tree']) && intval($this->resourceArray['show_in_tree']) == 1 ? true : false;

		$this->addHtml('
		<script type="text/javascript">
		// <![CDATA[
		miniShop2.config = {
			assets_url: "'.$minishopAssetsUrl.'"
			,connector_url: "'.$connectorUrl.'"
			,show_comments: false
			,main_fields: '.json_encode($product_main_fields).'
		}
		MODx.config.publish_document = "'.$this->canPublish.'";
		MODx.onDocFormRender = "'.$this->onDocFormRender.'";
		MODx.ctx = "'.$this->ctx.'";
		Ext.onReady(function() {
			MODx.load({
				xtype: "minishop2-page-product-create"
				,resource: "'.$this->resource->get('id').'"
				,record: '.$this->modx->toJSON($this->resourceArray).'
				,publish_document: "'.$this->canPublish.'"
				,canSave: '.($this->canSave ? 1 : 0).'
				,canEdit: '.($this->canEdit ? 1 : 0).'
				,canCreate: '.($this->canCreate ? 1 : 0).'
				,canDuplicate: '.($this->canDuplicate ? 1 : 0).'
				,canDelete: '.($this->canDelete ? 1 : 0).'
				,canPublish: '.($this->canPublish ? 1 : 0).'
				,show_tvs: '.(!empty($this->tvCounts) ? 1 : 0).'
				,mode: "create"
			});
		});
		// ]]>
		</script>');
		/* load RTE */
		$this->loadRichTextEditor();
	}


	/**
	 * Setup permissions for this page
	 * @return void
	 */
	public function setPermissions() {
		if ($this->canSave) {
			$this->canSave = $this->resource->checkPolicy('save');
		}
		$this->canEdit = $this->modx->hasPermission('edit_document');
		$this->canCreate = $this->modx->hasPermission('new_document');
		$this->canPublish = $this->modx->hasPermission('publish_document');
		$this->canDelete = ($this->modx->hasPermission('delete_document') && $this->resource->checkPolicy(array('save' => true, 'delete' => true)));
		$this->canDuplicate = $this->resource->checkPolicy('save');
	}
}