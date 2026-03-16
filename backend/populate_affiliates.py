import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from __init__ import create_app, db
from models.shoe import Shoe
from models.affiliate_link import AffiliateLink

app = create_app('development')

# Ejemplos de enlaces de afiliados - CON NOMBRES REALES DE TU BD
affiliate_data = [
    # Para Nike Pegasus 41 (no 40)
    {
        'shoe_brand': 'Nike',
        'shoe_model': 'Pegasus 41',
        'links': [
            {
                'partner_name': 'amazon',
                'affiliate_url': 'https://www.amazon.es/dp/B0C9J7QY8L?tag=stepwise-21',
                'price': 129.99,
                'shipping_info': 'Envío gratis Prime',
                'is_primary': True
            },
            {
                'partner_name': 'decathlon',
                'affiliate_url': 'https://www.decathlon.es/es/p/nike-pegasus-41/_/R-p-123456?aff=stepwise',
                'price': 134.99,
                'shipping_info': 'Envío 48h gratis',
                'is_primary': False
            }
        ]
    },
    # Para Salomon Speedcross 6 (ya funciona)
    {
        'shoe_brand': 'Salomon',
        'shoe_model': 'Speedcross 6',
        'links': [
            {
                'partner_name': 'decathlon',
                'affiliate_url': 'https://www.decathlon.es/es/p/salomon-speedcross-6/_/R-p-337882?aff=stepwise',
                'price': 139.99,
                'shipping_info': 'Envío gratis',
                'is_primary': True
            },
            {
                'partner_name': 'amazon',
                'affiliate_url': 'https://www.amazon.es/dp/B0B8X7Y6Z?tag=stepwise-21',
                'price': 144.99,
                'shipping_info': 'Envío gratis Prime',
                'is_primary': False
            },
            {
                'partner_name': 'forum',
                'affiliate_url': 'https://www.forum.es/salomon-speedcross-6?aff=stepwise',
                'price': 149.99,
                'shipping_info': 'Envío 24-48h',
                'is_primary': False
            }
        ]
    },
    # Para ASICS Novablast 5 (si existe)
    {
        'shoe_brand': 'ASICS',
        'shoe_model': 'Novablast 5',
        'links': [
            {
                'partner_name': 'amazon',
                'affiliate_url': 'https://www.amazon.es/dp/B0B8X7Y6Z?tag=stepwise-21',
                'price': 149.99,
                'shipping_info': 'Envío gratis Prime',
                'is_primary': True
            },
            {
                'partner_name': 'decathlon',
                'affiliate_url': 'https://www.decathlon.es/es/p/asics-novablast-5/_/R-p-123456?aff=stepwise',
                'price': 154.99,
                'shipping_info': 'Envío gratis',
                'is_primary': False
            }
        ]
    }
]

with app.app_context():
    print("🚀 Poblando enlaces de afiliados")
    print("="*60)
    
    created = 0
    not_found = []
    
    for data in affiliate_data:
        # Buscar la zapatilla
        shoe = Shoe.query.filter_by(
            brand=data['shoe_brand'],
            model=data['shoe_model']
        ).first()
        
        if not shoe:
            print(f"❌ Zapatilla no encontrada: {data['shoe_brand']} {data['shoe_model']}")
            not_found.append(f"{data['shoe_brand']} {data['shoe_model']}")
            continue
        
        # Eliminar enlaces existentes
        AffiliateLink.query.filter_by(shoe_id=shoe.id).delete()
        
        # Crear nuevos enlaces
        for link_data in data['links']:
            link = AffiliateLink(
                shoe_id=shoe.id,
                partner_logo=f"https://logo.clearbit.com/{link_data['partner_name']}.com",
                **link_data
            )
            db.session.add(link)
            created += 1
            print(f"✅ Añadido enlace {link_data['partner_name']} para {shoe.brand} {shoe.model} - {link_data['price']}€")
    
    db.session.commit()
    
    print("="*60)
    print(f"✅ Proceso completado: {created} enlaces creados")
    if not_found:
        print(f"❌ Zapatillas no encontradas: {', '.join(not_found)}")
        print("💡 Revisa los nombres exactos en tu BD con: http://localhost:5000/api/shoes")