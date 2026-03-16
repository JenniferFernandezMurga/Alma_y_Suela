from __init__ import create_app, db
from models.shoe import Shoe

app = create_app('development')

with app.app_context():
    total = Shoe.query.count()
    print(f"📊 Total zapatillas: {total}")

    # Verificar enlaces de afiliados
    with_links = Shoe.query.filter(Shoe.affiliate_link != '#').count()
    without_links = Shoe.query.filter(Shoe.affiliate_link == '#').count()

    print(f"\n🔗 Enlaces de afiliados:")
    print(f"   • Con enlace: {with_links}")
    print(f"   • Sin enlace: {without_links}")

    if total > 0:
        print(f"\n📋 Ejemplos de zapatillas:")
        for shoe in Shoe.query.limit(5).all():
            link_status = "✅" if shoe.affiliate_link != '#' else "❌"
            print(f"   {link_status} {shoe.brand} {shoe.model}: {shoe.affiliate_link}")