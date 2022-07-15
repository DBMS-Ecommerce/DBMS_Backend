"# DBMS_Backend" 


SELECT * FROM item INNER JOIN item_variant ON item.sku = item_variant.sku INNER JOIN variant ON variant.variant_id=item_variant.variant_id INNER JOIN product ON item.product_id = product.product_id;