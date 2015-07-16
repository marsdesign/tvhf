<?php   
class Bootstrap_Hero_Block_Featured extends Mage_Core_Block_Template{   

    public function __construct() {
        parent::__construct();
        //programmatically set template instead of xml
        //$this->setTemplate('bootstrap/ambassadors/city/view.phtml');
    }

   	public function getItems()
	{

		$_storeId = Mage::app()->getStore()->getStoreId();
    	$hero = Mage::getModel('hero/hero')->getCollection()
    			->addFieldToFilter('store_id', $_storeId)
				->setOrder('sort_order', 'ASC');
    	return $hero;
	}

}